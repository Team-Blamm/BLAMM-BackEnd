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

function newProdServ(prodId, servId) {
  return new Promise((resolve, reject) => {
    let productService = prodServsDb.build({
      "prodId": prodId,
      "servId": servId
    })
    productService.save()
    .then(function(prodServ) {
      resolve(prodServ);
    })
    .catch(function(err) {
      console.log('error', err);
      reject(err);
    })
  })
}

function findUpdateService(services, productId) {
  return new Promise((resolve, reject) => {
    services.map(service => {
      servicesDb.findOne({
        where: {
          "tag": service
        }
      }).then((serv) => {
        if (serv) {
          newProdServ(productId, serv.id)
          .then(function (prodServ) {
            return resolve(prodServ);
          })
        } else {
          let newService = servicesDb.build({
            "tag": service
          })
          newService.save()
          .then(function(newServ) {
            newProdServ(productId, newServ.id)
            .then(function (prodServ) {
              return resolve(prodServ);
            })
            .catch(function (err) {
              console.log('error building new prodServ');
              return reject(err);
            })
          })
          .catch(function (err) {
            console.log('error building new service');
            return reject(err);
          })
        }
      })
    })
  })
}

router.post('/products/:title/review', function (req, res) {
  // TODO: Allow any logged in user to leave a review
  res.json({
    "error": "placeholder"
  })
})

router.use(function (req, res, next) {
  // Allows for only users who are also admins to take these actions
  if (req.user.admin) {
    next();
  } else {
    return res.status(401).json({
      "error": "unauthorized"
    });
  }
})

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
    // should be using sequelize findOrCreate, but it's borked up with the version of Sequelize and postgres
    findUpdateService(req.body.services, newProd.id)
    .then(function(resolve) {
      res.json({
        "product": newProd.title
      })
    })
    .catch(function(err) {
      console.log('error saving new product', err);
      return res.json({
        "error": err
      })
    })
  })
  .catch(function(err) {
    console.log('error saving new product', err);
    return res.json({
      "error": err
    })
  })
})

router.put('/products/:title/update', function (req, res) {
  if (req.body.title) {
    return res.status(400).json({
      "error": "cannot update title"
    })
  }
  productsDb.findOne({
    where: {
      "title": req.params.title
    }})
  .then(function (product) {
    // ensure that the admin that is making the request is the same as the admin who created the resource
    if (req.user.id !== product.userId) {
      return res.status(401).json({
        "error": "unauthorized action"
      })
    }
    product.set(req.body)
    product.save().then(function(updated) {
      let outObj = {
        "product": updated.title
      }
      Object.keys(req.body).map((key) => {
        outObj[key] = updated[key]
      })
      if (req.body.services) {
        console.log('need to update services');
        // remove old product services
        prodServsDb.destroy({
          where: {
            prodId: product.id
          }
        }).then(function(next) {
          // check if the services exist, then add as necessary
          findUpdateService(req.body.services, product.id)
          .then(function(resolve) {
            outObj['services'] = req.body.services
            return res.json(outObj);
          })
          .catch(function (err) {
            console.log('error destroying old records', err);
            return res.json({
              'error': err
            })
          })
        })
        .catch(function (err) {
          console.log('error destroying old records', err);
          return res.json({
            'error': err
          })
        })
      } else {
        // console.log('updates:', updated);
        return res.json(outObj)
      }
    })
  })
})

router.delete('/products/:title/delete', function (req, res) {
  productsDb.findOne({
    where: {
      "title": req.params.title
    }})
  .then(function (product) {
    // ensure that the admin that is making the request is the same as the admin who created the resource
    if (req.user.id !== product.userId) {
      return res.status(401).json({
        "error": "unauthorized action"
      })
    }
    return res.json({
      "error": "placeholder"
    })
    // productsDb.destroy
  })
})

module.exports = router
