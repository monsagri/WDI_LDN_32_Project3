const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/stargazer-${env}`;
const secret = process.env.SECRETSTAR;

module.exports = {env, port, dbURI, secret};
