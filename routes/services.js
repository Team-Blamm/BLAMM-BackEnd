const express = require('express');
const router = express.Router();

const models = require('../models');
const usersDb = models.users;
const servicesDb = models.services;
const productsDb = models.products;
const prodServsDb = models.prodServs;
const reviewsDb = models.reviews;
const receiptDb = models.receipts;
const ordersDb = models.orders;

function findOrCreateService(service, productId) {
  console.log('finding or creating a service and associating with prodId', service, productId);
  servicesDb.findOrCreate({
    where: {
      "tag": service
    },
    defaults: {
      "tag": service
    }
  }).spread(function(serv, created) {
    console.log('new services created');
    console.log('service:', serv);
  })
  .catch(function(err) {
    console.log('error finding/creating service', service, err);
    return res.json({
      "error": err
    })
  })

}


module.exports = router
