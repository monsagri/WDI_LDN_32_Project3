const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environments');


const Event = require('../models/event');
const eventData = require('./data/events');

const Place = require('../models/place');
const placeData = require('./data/places');

const User = require('../models/User');
const userData = require('./data/Users');


const rp = require('request-promise');

const allEvents = [];
let asteroids = null;
let datesQueried = null;
let satellites = null;
const satellitesClean = [];

// Date variables for NASA API
const now = new Date();
// Need to transform this to contain only date info, not time
const endDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());


// run over array of places and add the weather
function addWeather() {
  placeData.forEach(place => {
    place.weather = { data: 'none'};
    // get weather for the place, using preseeded location data and darksky api
    rp({
      url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${place.location.lat},${place.location.lng}`,
      qs: { units: 'si' },
      json: true
    })
    // Attach daily weather data to the place.
      .then(response => place.weather = response.daily);
  });
}

// request Asteroid data until endDate from NeoAsteroids
function getAsteroids() {
  return rp({
    url: `https://api.nasa.gov/neo/rest/v1/feed?end_date${endDate}&api_key=${process.env.NASA_API_KEY}`,
    json: true
  })
    .then(response => {
      // all data
      asteroids = response;
      // this gives us the dates and sorts them
      datesQueried = Object.keys(asteroids.near_earth_objects).sort();
      datesQueried.forEach( (date, index) => {
        // this creates an array of objects where each object is one days events
        const daysEvents = Object.values(asteroids.near_earth_objects)[index];

        // this turns each event into an object that we can push into the DB
        daysEvents.forEach((event) => {
          // event.date data is transformed into unix timestamps in order to sort input from different formats by date easily
          event.date = (new Date(event.close_approach_data[0].close_approach_date)).getTime();
          event.missDistance = event.close_approach_data[0].miss_distance.kilometers;
          event.visibility = 'Telescope';
          event.type = 'Asteroid';
          allEvents.push(event);
        });
      });
    });
}

// request satellite data from calum API
function getSatellites() {
  // location data is currently hardcoded to london, might want to pull it from user data
  return rp({
    url: 'https://api.satellites.calum.org/rest/v1/multi/next-pass?lat=51.51794662&lon=-0.0749192&alt=0',
    json: true,
    method: 'POST',
    body: {'norad-ids': ['25544','27607','39444','24278','40909']}
  })
    .then(response => {
      // all data
      satellites = response;
      // satellite.date data is transformed into unix timestamps in order to sort input from different formats by date easily
      // Substring is used to normalize the date to exclude time data
      satellites.passes.forEach(satellite => {
        satellite.date = (new Date(satellite.start.substring(0,10))).getTime();
        satellite.startTime = satellite.start;
        satellite.endTime = satellite.end;
        satellite.type = 'Satellite';
        satellite.visibility = 'Naked Eye';
        satellitesClean.push(satellite);
      });
    });
}

// This runs over eventData in order to normalize all date/time stamps used
function normalizeTime() {
  eventData.forEach(event => {
    event.date = (new Date(event.date)).getTime();
  });
}
mongoose.connect(dbURI, (err, db) => {
  addWeather();
  db.dropDatabase()
    .then(() => console.log('connected to db and cleared it'))
    // External API Data
    .then(() => getAsteroids())
    .then(() => Event.create(allEvents))
    .then(events => console.log(`${events.length} Asteroids Created`))
    .then(() => getSatellites())
    .then(() => Event.create(satellitesClean))
    .then((events) => console.log(`${events.length} Satellites created`))
    .then(() => normalizeTime())
    // Locally stored Data
    .then(() => Event.create(eventData))
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .then(() => Place.create(placeData))
    .then(places => console.log(`${places.length} places created`))
    .catch(err => console.log(err))
    .then(() => User.create(userData))
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
