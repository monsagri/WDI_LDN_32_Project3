GA WDI LDN Project 3


![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# GA WDI-32 <br> Project 3 - StarGazer
Set in teams of three we were given 7 days to create a MEAN stack application using:
- **M**ongo - For the database
- **E**xpress - For the web-framework
- **A**ngular - Angular(1) for the client-side framework
- **N**ode - For the server-side language**.

Star Gazer is a web application built to create an easy and convenient way for stargazing enthusiasts and *laypeople* alike to discover celestial events and providing them with appropriate and scenic locations to view them from.

Using third-party APIs, the site displays events such as Meteor Showers and Astroids, with relevant information related to said event.   
It also hosts a database of appropriate locations to observe these events from as well as providing weather data to ensure that users can go out in the best conditions.

Once registered, users are able to add comments, post their own events and locations, and favourite the ones they're most interested in.

##### [Visit the website](https://stargazerapp.herokuapp.com/) for best *viewing* experience (the application is not yet designed for mobile).
---

###### EVENTS INFO

<p align="center"><img src="https://i.imgur.com/DaPleuv.png" width="700"></p>
All our Events are displayed in card format, sorted by date. A nested ng-repeat creates titles for each date and then displays those days events underneath.
<br><br><br>

<p align="center"><img src="https://i.imgur.com/xv06h6q.jpg" width="700"></p>
Each event has a show page which provides additional information and allows users to comment, favourite and upload images.
<br><br><br>



###### LOCATIONS INFO

<p align="center"><img src="https://i.imgur.com/QyrlLO2.png" width="700"></p>
Star Gazer has hard-coded data for the best places to view the celestial events from. This data is presented in a *card format* with a map at the top of the page containing the location of all places displayed as weather icons, pulling weather data from each area to determine which icon will be on show.
<br><br><br>

<p align="center"><img src="https://i.imgur.com/jVEWItC.png" width="700"></p>

Each location has a display page which authorised users can edit, favourite, and comment on. There's information displayed from the APIs for 7 days, starting from today's date, in order of date, containing the phases of the moon and the weather for that place. The page also includes a map, which if the browser has geolocation enabled, provides routing information from the user's location to the area in question.

<p align="center"><img src="https://i.imgur.com/FO5KypD.png" width="700"></p>

<p align="center"><img src="https://i.imgur.com/w3SRlHW.jpg" width="700"></p>

When creating a new place, the *location field* is a Google Maps Autocomplete input field which *directly relates to the information displayed both on the index and show pages*. The user can also upload a photo of the place from their computer, using the file-picker API.

<p align="center"><img src="https://i.imgur.com/Z7Jx0mB.png?1" width="700"></p>

_____

###### PLACES INFO

Star Gazer has a profile page, displaying your profile picture, which can be altered at any time using file-picker. The page also shows your favourited events and places, hidden until you click on "See your favourites" using ng-click and ng-class. *These can be clicked on to take you to the page of the favourited event/place.*


<p align="center"><img src="https://i.imgur.com/wbpQ1wN.png" width="700"></p>

_________________

###### BACKEND INFO  
Star Gazer consumes several APIs in order to accumulate data on celestial events and the weather.  

We consume the NASA neoAsteroids API for information on close approach asteroids and the CALUM API for data on visible satellite passes.  

Once we have pulled the data on these events, we consume the Dark Sky API to add weather data to our pre-seeded database of good stargazing locations. This data is displayed on the website in order to help users decide on ideal dates.

The request to Dark Sky is also exported into a script that is run every 24 hours to ensure up to date information.

_________________

###### BLOCKERS

There were some initial issues with merging files as we got accustomed to working as a team via Github, but during the week we quickly become familiar with the process.    
Unfortunately we ran into a major problem on the last day of the project, which ended up overwriting previous work with every commit.

We spent that evening pushing our communication as eloquently as we could in order to fix the mass of the issue with considerable success.

We had created all our styling in one scss file which created mass conflicts when splitting the styling roles. We became aware when it was too late but will not make the same mistake twice.


_________________

###### WINS

This was our first experience coding as a team, as opposed to working solo or with a partner.   
It was a new experience that showed the differences in workflow, but also showcased how much more you're able to achieve when you pool resources.



_________________
###### MORE TIME

Working in a team provided us with the man power to do more than we would alone.
Despite this there are several features we would have liked to implement had we had more time.


We would have liked to hide the directions displayed by google as they come in hard and fast, pushing the comments section down a considerable amount. We made the executive decision to remove the printed directions from the code in order to keep the site clean.

It would have been nice to display multiple markers on one location to mark the several possible spots available in the one said location.

We could have created a function that changed the number values of 'moon phases' into images of the moons as it's quite difficult to tell what they mean without informed research.

We would have liked to add direct messaging so that users could keep in touch after events.

A global gallery, which would push images uploaded by users into a page for users to scroll through, add comments and favourite the ones they liked.


## Setup instructions

Clone or download the repo  
Install dependencies with `yarn install`
Launch the app with `yarn start:server` and `yarn start:client`
