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

// const services = require('./services')

router.use(function (req, res, next) {
  console.log('products admin', req.user.username, req.user.admin);
  if (req.user.admin) {
    next();
  } else {
    return res.status(401).json({
      "error": "unauthorized"
    });
  }
})

function newProdServ(prodId, servId) {
  let productService = prodServsDb.build({
    "prodId": prodId,
    "servId": servId
  })
  productService.save()
  .then(function(prodServ) {
    return;
  })
  .catch(function(err) {
    console.log('error', err);
    return;
  })
}

router.post('/products/add', function (req, res) {
  let newProduct = productsDb.build({
    "title": req.body.title,
    "description": req.body.description,
    "rate": req.body.rate,
    "type": req.body.type,
    "tagline": req.body.tagline,
    "imgSrc": req.body.imgSrc,
    "bgImg": req.body.bgImg,
    "userId": req.user.id
  })
  newProduct.save()
  .then(function(newProd) {
    console.log(`new product, ${newProd.title}, added to DB`);
    let count = 0;
    req.body.services.map(function(service) {
      servicesDb.findOne({
        where: {
          "tag": service
        }
      }).then((serv) => {
        // console.log(serv);
        if (serv) {
          newProdServ(newProd.id, serv.id)
        } else {
          let newService = servicesDb.build({
            "tag": service
          })
          newService.save()
          .then(function(newServ) {
            newProdServ(newProd.id, newServ.id)
          })
        }
      })
      // should be using findOrCreate, but it's borked up with the version of Sequelize and postgres
      // servicesDb.findOrCreate
    })
    res.json({
      "product": newProd.title
    })
  }).catch(function(err) {
    console.log('error saving new product', err);
    return res.json({
      "error": err
    })
  })
})

module.exports = router
