'use strict'

const express = require('express');
const router = express.Router();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// const models = require('../models');

router.get('/products', function (req, res) {
  res.json({
    "count": 4,
    "results": [
      {
        "title": "Batman",
        "price": "$800/hr",
        "img_src": "",
        "type": "hero",
        "tagline": "NaNaNaNaNaNaNaNaNa",
        "services": [
          "detective",
          "lurking",
          "gadgets"
        ]
      }, {
        "title": "Spiderman",
        "price": "$20/hr",
        "img_src": "",
        "type": "hero",
        "tagline": "Friendly Neighborhood Spiderman",
        "services": [
          "photography",
          "climbing",
          "gadgets"
        ]
      }, {
        "title": "Megatron",
        "price": "$50/hr",
        "img_src": "",
        "type": "villan",
        "tagline": "Destruction at a great price",
        "services": [
          "demolition",
          "protection"
        ]
      }, {
        "title": "Dr. Hugo Strange",
        "price": " $100/hr",
        "img_src": "",
        "type": "villan",
        "tagline": "How...Interesting",
        "services": [
          "psychiatrist",
          "long range planning"
        ]
      }
    ]
  })
})



module.exports = router;
