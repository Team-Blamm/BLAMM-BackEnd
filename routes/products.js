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

const secureProdRoute = require('./secureProducts')

router.post('/products/:title/review', function (req, res) {
  // Allows any logged in user to leave a review
  productsDb.find({
    where: {"title": req.params.title}
  })
  .then(function (product) {
    let newReview = reviewsDb.build({
      "userId": req.user.id,
      "prodId": product.id,
      "rating": req.body.rating,
      "review": req.body.review
    })
    newReview.save()
    .then(function (savedReview) {
      return res.json({
        "product": product.title,
        "rating": savedReview.rating,
        "review": savedReview.review
      })
    })
    .catch(function (err) {
      console.log('error building new review');
      return res.json({
        "error": err
      });
    })
  })
  .catch(function (err) {
    console.log('error fetching the product');
    return res.json({
      "error": err
    });
  })
})

// Allows for only users who are also admins to take these actions
router.use(secureProdRoute);

module.exports = router
