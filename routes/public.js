'use strict'

const express = require('express');
const router = express.Router();

const models = require('../models');
const prodDb = models.products;

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
  res.json({
    "error": "method not yet functional"
  })
})


module.exports = router;
