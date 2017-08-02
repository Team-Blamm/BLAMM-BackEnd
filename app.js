'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const pg = require('pg');
const env = process.env.NODE_ENV || "dev";
const config = require('./config/config.json')[env]

// console.log(process.env.DATABASE_URL);

// TODO: add routes here
const pubRoutes = require('./routes/pub');
const publicRoutes = require('./routes/public')
const privRoutes = require('./routes/priv');

// TODO: adding models here
const usersDb = require('./models/users');
const servicesDb = require('./models/services');
const productsDb = require('./models/products');
const prodServsDb = require('./models/prodServs');
const reviewsDb = require('./models/reviews');
const receiptDb = require('./models/receipts');
const ordersDb = require('./models/orders')

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
app.use('/api/v2', publicRoutes);
app.use('/api/v2', privRoutes);

app.set('port', (process.env.PORT || 3000));
if (require.main === module) {
  app.listen(app.get('port'), function () {
    console.log("Server running at http://localhost:3000")
  })
}

module.exports = app;
