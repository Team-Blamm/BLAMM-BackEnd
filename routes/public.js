'use strict'

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

router.get('/products/type/:type', function (req, res) {
  res.json({
    "error": "method not yet functional"
  })
})

router.get('/products/name/:title', function (req, res) {
  res.json({
    "error": "method not yet functional"
  })
})

router.get('/products', function (req, res) {
  productsDb.findAll({
    where: {},
    include: {
      model: prodServsDb,
      as: 'productServices',
      include: {
        model: servicesDb,
        as: 'servedProducts'
      }
    }
  })
  .then(function (products) {
    let outJson = {
      "count": products.length
    }
    outJson["results"] = products.map((product) => {
      // console.log(product.productServices);
      let services = product.productServices.map((service) => {
        return service.servedProducts.tag
      })
      return {
        "title": product.title,
        "tagline": product.tagline,
        "type": product.type,
        "rate": Number(product.rate),
        "imgSrc": product.imgSrc,
        "services": services
      }
    })
    console.log('outJson', outJson);
    return res.json(outJson);
  })
  .catch(function(err) {
    console.log('error fetching products', err);
    return res.json({
      "error": err
    })
  })
})


module.exports = router;
