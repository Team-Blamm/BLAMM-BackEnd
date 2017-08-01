'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const env = process.env.NODE_ENV || "dev";
const config = require('./config/config.json')[env]

// TODO: add routes here
const pubRoutes = require('./routes/pub');
// const privRoutes = require('./routes/priv');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'this is very secret',
  resave: false,
  saveUninitialized: false
}));

// TODO: use Routes here
app.use('/api/v1', pubRoutes);
// app.use('/api/v1', privRoutes);

app.set('port', (process.env.PORT || 3000));
if (require.main === module) {
  app.listen(app.get('port'), function () {
    console.log("Server running at http://localhost:3000")
  })
}

module.exports = app;
