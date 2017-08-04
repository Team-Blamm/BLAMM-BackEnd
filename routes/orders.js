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

router.get('/orders', function (req, res) {
  receiptDb.findAll({
    where: {"userId": req.user.id},
    include: {
      model: ordersDb,
      as: 'receiptOrders',
      include: {
        model: productsDb,
        as: 'prodOrders'
      }
    }
  })
  .then(function(receipts) {
    let receiptOut = receipts.map((rece) => {
      let orderOut = rece.receiptOrders.map((ord) => {
        return {
          "product": ord.prodOrders.title,
          "quantity": ord.quantity
        }
      })
      return {
        "customer": req.user.username,
        "receiptId": rece.id,
        "order": orderOut
      }
    })
    let outObj = {
      "count": receipts.length,
      "receipts": receiptOut
    }
    return res.json(outObj);
  })
  .catch(function (err) {
    console.log("error finding receipts", err);
    return res.json({
      "error": err
    })
  })
})

router.post('/orders/new', function (req, res) {
  // fetch user, insert into receipt table, then for each order, fetch the product and insert prodId, receiptId and quantity into the order table
  usersDb.find({
    where: {"id": req.user.id}
  })
  .then(function (user) {
    let newReceipt = receiptDb.build({
      "userId": user.id
    })
    newReceipt.save()
    .then(function(receipt) {
      req.body.order.map(function(order) {
        productsDb.find({
          where: {"title": order.product}
        })
        .then(function (prod) {
          let newOrder = ordersDb.build({
            "receiptId": receipt.id,
            "prodId": prod.id,
            "quantity": order.quantity
          })
          newOrder.save()
          .then(function (Ordered) {
            //nothing to do
          })
          .catch(function (err) {
            console.log('error saving new order', err);
            return res.json({
              "error": err
            })
          })
        })
        .catch(function (err) {
          console.log('error finding product', err);
          return res.json({
            "error": err
          })
        })
      })
      res.json({
        "customer": user.username,
        "orderNumber": receipt.id,
        "order": req.body.order
      })
    })
    .catch(function (err) {
      console.log('error createing receipt', err);
      res.json({
        "error": err
      })
    })
  })
  .catch(function (err) {
    console.log('error finding user', err);
    res.json({
      "error": err
    })
  })
})

module.exports = router
