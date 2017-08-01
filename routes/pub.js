'use strict'

const express = require('express');
const router = express.Router();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// const models = require('../models');
router.get('/products/type/:type', function (req, res) {
  if (req.params.type === "hero") {
    res.json({
      "count": 2,
      "results": [
        {
          "title": "Batman",
          "rate": 800,
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
          "rate": 19.99,
          "img_src": "",
          "type": "hero",
          "tagline": "Friendly Neighborhood Spiderman",
          "services": [
            "photography",
            "climbing",
            "gadgets"
          ]
        }
      ]
    })
  } else {
    res.json({
      "count": 2,
      "results": [
        {
          "title": "Megatron",
          "rate": 50,
          "img_src": "",
          "type": "villan",
          "tagline": "Destruction at a great rate",
          "services": [
            "demolition",
            "protection"
          ]
        }, {
          "title": "Dr. Hugo Strange",
          "rate": 100,
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
  }
})

router.get('/products/name/:title', function (req, res) {
  if (req.params.title === "Batman") {
    res.json({
      "count": 1,
      "title": "Batman",
      "rate": 800,
      "description": "The Dark Knight of Gotham, has a full compliment of technologic tricks and sidekicks to ensure that he can really complete the task you have for him.  Also the worlds greatest detective.",
      "img_src": "",
      "bg_img": "",
      "type": "hero",
      "tagline": "NaNaNaNaNaNaNaNaNa",
      "services": [
        "detective",
        "lurking",
        "gadgets"
      ],
      "Reviews": [
        {
          "username": "penguin",
          "rating": 0,
          "review": "Worst hero ever.  Doesn't like birds OR fish"
        },
        {
          "username": "Superman",
          "rating": 5,
          "review": "A good friend, and always able to help out when the world is ending"
        },
        {
          "username": "GordonJ",
          "rating": 5,
          "review": "Asked him to investigate my wife.  Not only did he find ample evidence of her cheating, he also applied some vengence to thugs down by the river for me!"
        },
        {
          "username": "IronMan",
          "rating": 2,
          "review": "Very overpriced. Poor technology, and unwilling to kill his villains."
        }
      ]
    })
  }
})

router.get('/products', function (req, res) {
  res.json({
    "count": 4,
    "results": [
      {
        "title": "Batman",
        "rate": 800,
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
        "rate": 20,
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
        "rate": 50,
        "img_src": "",
        "type": "villan",
        "tagline": "Destruction at a great price",
        "services": [
          "demolition",
          "protection"
        ]
      }, {
        "title": "Dr. Hugo Strange",
        "rate": 100,
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
