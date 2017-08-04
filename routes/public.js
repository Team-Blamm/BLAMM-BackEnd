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

function findAllWhere(whereStmt) {
  return new Promise ((resolve, reject) => {
    productsDb.findAll({
      where: whereStmt,
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
      // console.log('output:', outJson);
      resolve(outJson);
    })
    .catch(function(err) {
      console.log('error fetching products', err);
      reject(err)
    })
  })
}

router.get('/products/name/:title', function (req, res) {
  productsDb.findOne({
    where: { "title": req.params.title },
    include: [{
      model: prodServsDb,
      as: 'productServices',
      include: {
        model: servicesDb,
        as: 'servedProducts'
      }
    },
    {
      model: reviewsDb,
      as: 'productReviews',
      include: {
        model: usersDb,
        as: 'userReviews'
      }
    }]
  })
  .then(function(product) {
    // console.log('product JSON:', product);
    let services = product.productServices.map((service) => {
      return service.servedProducts.tag
    })
    let reviews = product.productReviews.map((review) => {
      return {
        "username": review.userReviews.username,
        "rating": review.rating,
        "review": review.review
      }
    })
    return res.json({
      "count": 1,
      "title": product.title,
      "tagline": product.tagline,
      "type": product.type,
      "rate": Number(product.rate),
      "description": product.description,
      "imgSrc": product.imgSrc,
      "bgImg": product.bgImg,
      "services": services,
      "reviews": reviews
    })
  })
  .catch(function(err) {
    console.log('error', err);
    res.json({
      "error": err
    })
  })
})

router.get('/products/type/:type', function (req, res) {
  findAllWhere({type: req.params.type})
  .then(function(data) {
    res.json(data)
  })
  .catch(function(err) {
    console.log('error', err);
    res.json({
      "error": err
    })
  })
})

router.get('/products', function (req, res) {
  findAllWhere({})
  .then(function(data) {
    res.json(data)
  })
  .catch(function(err) {
    console.log('error', err);
    res.json({
      "error": err
    })
  })
})


module.exports = router;
