'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const pg = require('pg');
const cors = require('cors');
const env = process.env.NODE_ENV || "dev";
const config = require('./config/config.json')[env]

// console.log(process.env.DATABASE_URL);

// TODO: add routes here
const pubRoutes = require('./routes/pub');
const publicRoutes = require('./routes/public')
const privRoutes = require('./routes/authenticate');

// TODO: adding models here
// const models = require('./models');
// const usersDb = models.users;
// const servicesDb = models.services;
// const productsDb = models.products;
// const prodServsDb = models.prodServs;
// const reviewsDb = models.reviews;
// const receiptDb = models.receipts;
// const ordersDb = models.orders;

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

app.use(cors());

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
