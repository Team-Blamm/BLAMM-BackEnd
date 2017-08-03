const assert = require("assert");
const request = require("supertest");
const app = require('../app');

const models = require('../models')
const usersDb = models.users;
const servicesDb = models.services
const productsDb = models.products
const prodServsDb = models.prodServs
const reviewsDb = models.reviews
const receiptDb = models.receipts
const ordersDb = models.orders

describe('POST /api/v2/signup - add a user to the DB', function () {
  before('reset the test database', function(done) {
    usersDb.destroy({ where: {}, truncate: false }).then(function() {});
    servicesDb.destroy({ where: {}, truncate: false }).then(function() {});
    productsDb.destroy({ where: {}, truncate: false }).then(function() {});
    prodServsDb.destroy({ where: {}, truncate: false }).then(function() {});
    reviewsDb.destroy({ where: {}, truncate: false }).then(function() {});
    receiptDb.destroy({ where: {}, truncate: false }).then(function() {});
    ordersDb.destroy({ where: {}, truncate: false }).then(function() {});

    setTimeout(function() {
      return done();
    }, 500);
  })

  it('Should add user "Reynard" to the user collection', function(done) {
    request(app).post('/api/v2/signup')
      .send({
        "username": "oracle",
        "password": "oracle",
        "email": "oracle@batman.com",
        "imgSrc": "",
        "admin": true
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect({
        "user": "oracle"
      })
      .end(done)
  });
  it('Should add user "MrFreeze" to the user collection', function(done) {
    request(app).post('/api/v2/signup')
      .send({
        "username": "MrFreeze",
        "password": "coldFront",
        "email": "freezing@frost.com",
        "imgSrc": "123.jpg"
      })
      .expect(200)
      .expect({
        "user": "MrFreeze"
      })
      .end(done)
  });
  it('Should verify there are 2 users in the DB', function (done) {
    usersDb.count({}).then(function(num) {
      assert.equal(num, 2);
      done();
    })
  })
  it('Should return that brad:test is an invalid user:pass', function(done) {
    request(app).get('/api/v2/check')
    .auth("brad", "test")
    .expect(401)
    .end(done)
  })
  it('Should return that MrFreeze/coldFront is a valid user:pass', function(done) {
    request(app).get('/api/v2/check')
      .auth("MrFreeze", "coldFront")
      .expect(200)
      .expect({
        "username": "MrFreeze"
      })
      .end(done)
  })
})
