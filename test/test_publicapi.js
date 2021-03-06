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

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

describe('POST /api/v2/signup - add a user to the DB', function () {
  before('reset the test database', function(done) {
    prodServsDb.destroy({ where: {}, truncate: false }).then(function() {
      ordersDb.destroy({ where: {}, truncate: false }).then(function() {
        servicesDb.destroy({ where: {}, truncate: false }).then(function() {
          receiptDb.destroy({ where: {}, truncate: false }).then(function() {
            reviewsDb.destroy({ where: {}, truncate: false }).then(function() {
              productsDb.destroy({ where: {}, truncate: false }).then(function() {
                usersDb.destroy({ where: {}, truncate: false }).then(function() {
                  return done();
                });
              });
            });
          });
        });
      });
    });
  });

  it('Should add user "oracle" to the user collection', function(done) {
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


describe('POST /api/v2/products - test all products functions', function () {

  it('Should not allow MrFreeze to add Batman', function (done) {
    request(app).post('/api/v2/products/Batman/update')
    .auth('MrFreeze', 'coldFront')
    .send({
      "title": "Batman",
      "tagline": "NaNaNaNaNaNaNaNaNa",
      "type": "hero",
      "description": "The Dark Knight of Gotham, has a full compliment of technologic tricks and sidekicks to ensure that he can really complete the task you have for him.  Also the worlds greatest detective.",
      "rate": 800,
      "imgSrc": "https://comicvine.gamespot.com/images/1300-3031477/",
      "bgImg": "",
      "services": [
        "detective",
        "lurking",
        "gadgets"
      ]
    })
    .expect(401)
    .end(done);
  })
  it('Should allow oracle to add a Batman product', function (done) {
    request(app).post('/api/v2/products/add')
    .auth("oracle", "oracle")
    .send({
      "title": "Batman",
      "tagline": "NaNaNaNaNaNaNaNaNa",
      "type": "hero",
      "description": "The Dark Knight of Gotham, has a full compliment of technologic tricks and sidekicks to ensure that he can really complete the task you have for him.  Also the worlds greatest detective.",
      "rate": 800,
      "imgSrc": "https://comicvine.gamespot.com/images/1300-3031477/",
      "bgImg": "",
      "services": [
        "detective",
        "lurking",
        "gadgets"
      ]
    })
    .expect(200)
    .expect({
      "product": "Batman"
    })
    .end(done)
  })

  it('Should verify there is 1 product in the product DB', function (done) {
    productsDb.count({}).then(function(num) {
      assert.equal(num, 1);
      done();
    }).catch(function(err) {
      // log(err);
      done();
    })
  })
  it('Should verify there are 3 services in the services DB', function (done) {
    servicesDb.count({}).then(function(num) {
      assert.equal(num, 3);
      done();
    }).catch(function(err) {
      // console.log(err);
      done();
    })
  })
  it('Should verify there are 3 entries in the prodServ DB', function (done) {
    prodServsDb.count({}).then(function(num) {
      assert.equal(num, 3);
      done();
    }).catch(function(err) {
      // console.log(err);
      done();
    })
  })

  it('Should allow oracle to add a Nightwing product', function (done) {
    request(app).post('/api/v2/products/add')
    .auth("oracle", "oracle")
    .send({
      "title": "Nightwing",
      "tagline": "I am the Night(wing)",
      "type": "hero",
      "description": "I used to be Robin.",
      "rate": 40,
      "imgSrc": "",
      "bgImg": "",
      "services": [
        "detective",
        "gadgets",
        "childrens parties"
      ]
    })
    .expect(200)
    .expect({
      "product": "Nightwing"
    })
    .end(done)
  })
  it('Should verify there are 2 products in the product DB', function (done) {
    productsDb.count({}).then(function(num) {
      assert.equal(num, 2);
      done();
    }).catch(function(err) {
      // console.log(err);
      done();
    })
  })
  it('Should verify there are 4 services in the services DB', function (done) {
    servicesDb.count({}).then(function(num) {
      assert.equal(num, 4);
      done();
    }).catch(function(err) {
      // console.log(err);
      done();
    })
  })
  it('Should verify there are 6 entries in the prodServ DB', function (done) {
    prodServsDb.count({}).then(function(num) {
      assert.equal(num, 6);
      done();
    }).catch(function(err) {
      // console.log(err);
      done();
    })
  })

  it('Should not allow MrFreeze to update Batman', function (done) {
    request(app).put('/api/v2/products/Batman/update')
    .auth('MrFreeze', 'coldFront')
    .send({
      'description': 'I am now a snowman'
    })
    .expect(401)
    .end(done);
  })
  it('Should not allow oracle to update Nightwings title', function (done) {
    request(app).put('/api/v2/products/Nightwing/update')
    .auth('oracle', 'oracle')
    .send({
      'title': 'Robin'
    })
    .expect(400)
    .expect({
      'error': 'cannot update title'
    })
    .end(done)
  })
  it('Should allow oracle to update the Batman rate', function (done) {
    request(app).put('/api/v2/products/Batman/update')
    .auth('oracle', 'oracle')
    .send({
      'rate': 79.99
    })
    .expect(200)
    .expect({
      'product': 'Batman',
      'rate': '79.99'
    })
    .end(done)
  })
  it('Should allow oracle to update the Batman tagline and services', function (done) {
    request(app).put('/api/v2/products/Batman/update')
    .auth('oracle', 'oracle')
    .send({
      'tagline': 'The Dark Knight',
      'services': [
        'detective',
        'chauffeur'
      ]
    })
    .expect(200)
    .expect({
      'product': 'Batman',
      'tagline': 'The Dark Knight',
      'services': [
        'detective',
        'chauffeur'
      ]
    })
    .end(done)
  })
  it('Should allow oracle to update the Batman tagline and services', function (done) {
    request(app).put('/api/v2/products/Batman/update')
    .auth('oracle', 'oracle')
    .send({
      'tagline': ''
    })
    .expect(200)
    .expect({
      'product': 'Batman',
      'tagline': 'The Dark Knight'
    })
    .end(done)
  })
})

describe('GET /api/v2/products - test the gets', function () {
  it('Should return Batman and Nightwing', function (done) {
    request(app).get('/api/v2/products')
    .expect(200)
    .expect(function (res) {
      // I know I'm being really lazy, I should check everything that is in the JSON above.  No Time.
      // While I'm at it, I should split this into 8 files and make them completely independant.
      // #HopesAndDreams
      assert.equal(res.body.count, 2);
    })
    .end(done)
  })
  it('Should add user "deadpool" to the user collection', function(done) {
    request(app).post('/api/v2/signup')
      .send({
        "username": "deadpool",
        "password": "skullpoopl",
        "email": "deadpool@deadpool.com",
        "imgSrc": "",
        "admin": true
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect({
        "user": "deadpool"
      })
      .end(done)
  });
  it('Should allow deadpool to add a Deadpool product', function (done) {
    request(app).post('/api/v2/products/add')
    .auth("deadpool", "skullpoopl")
    .send({
      "title": "Deadpool",
      "tagline": "Hi",
      "type": "antihero",
      "description": "Hi, I'm Deadpool!",
      "rate": .99,
      "imgSrc": "",
      "bgImg": "",
      "services": [
        "pool cleaning",
        "childrens parties"
      ]
    })
    .expect(200)
    .expect({
      "product": "Deadpool"
    })
    .end(done)
  })
  it('Should return All 3', function (done) {
    request(app).get('/api/v2/products')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.count, 3);
    })
    .end(done)
  })
  it('Should return only Deadpool', function (done) {
    request(app).get('/api/v2/products/type/antihero')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.count, 1);
    })
    .end(done);
  })
  it('Should return full Details for Deadpool', function (done) {
    request(app).get('/api/v2/products/name/Deadpool')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.count, 1);
      assert.equal(res.body.title, "Deadpool");
      assert.equal(res.body.services.includes("pool cleaning"), true);
      assert.equal(res.body.services.length, 2);
      assert.equal(res.body.reviews.length, 0);
    })
    .end(done)
  })
  it('Should return both Batman and Nightwing', function (done) {
    request(app).get('/api/v2/products/service/detective')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.count, 2);
      assert.equal(res.body.results[0].title === "Batman" || res.body.results[0].title === "Nightwing", true)
      assert.equal(res.body.results[1].title === "Batman" || res.body.results[1].title === "Nightwing", true)
    })
    .end(done)
  })
  it('Should return a list of all services', function (done) {
    request(app).get('/api/v2/services')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.count, 6);
      assert(res.body.results.includes('detective'))
      assert(res.body.results.includes('pool cleaning'))
      assert(res.body.results.includes('lurking'))
      assert(res.body.results.includes('childrens parties'))
      assert(res.body.results.includes('gadgets'))
      assert(res.body.results.includes('chauffeur'))
    })
    .end(done);
  })
})

describe('POST /api/v2/products/:title/review', function () {
  it('Should allow a valid user to post a rating and review', function (done) {
    request(app).post('/api/v2/products/Batman/review')
    .auth('MrFreeze', 'coldFront')
    .send({
      "rating": 1,
      "review": "Requested a ride across town, he wouldn't let me touch the temperature controls, or even consider turning it down.  Very inconsiderate"
    })
    .expect(200)
    .expect({
      "product": "Batman",
      "rating": 1,
      "review": "Requested a ride across town, he wouldn't let me touch the temperature controls, or even consider turning it down.  Very inconsiderate"
    })
    .end(done)
  })
  it('Should verify that the review shows up when getting Batman', function (done) {
    request(app).get('/api/v2/products/name/Batman')
    .expect(200)
    .expect(function (res) {
      assert(res.body.reviews[0].username == "MrFreeze");
      assert(res.body.reviews[0].userImg == "123.jpg")
      assert(res.body.reviews[0].rating == 1);
      assert(res.body.reviews[0].review == "Requested a ride across town, he wouldn't let me touch the temperature controls, or even consider turning it down.  Very inconsiderate")
    })
    .end(done)
  })
})

describe('POST /api/v2/orders - test orders', function () {
  it('Should add a new order and receipt for MrFreeze', function (done) {
    request(app).post('/api/v2/orders/new')
    .auth('MrFreeze', 'coldFront')
    .send({
      "order": [
        {
          "product": "Deadpool",
          "quantity": 10
        },
        {
          "product": "Nightwing",
          "quantity": .5
        }
      ]
    })
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.customer, "MrFreeze");
      assert.equal(res.body.order.length, 2);
      assert(res.body.orderNumber);
    })
    .end(done)
  })
  it('Should add a new order and receipt for oracle', function (done) {
    request(app).post('/api/v2/orders/new')
    .auth('oracle', 'oracle')
    .send({
      "order": [
        {
          "product": "Batman",
          "quantity": 1
        }
      ]
    })
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.customer, "oracle");
      assert.equal(res.body.order.length, 1);
      assert(res.body.orderNumber);
    })
    .end(done)
  })
  it('Should let MrFreeze get his receipt', function (done) {
    request(app).get('/api/v2/orders')
    .auth('MrFreeze', 'coldFront')
    .expect(200)
    .expect(function (res) {
      assert.equal(res.body.receipts[0].customer, "MrFreeze");
      assert.equal(res.body.count, 1);
    })
    .end(done)
  })
})

describe(' DELETE /api/v2/products/:title/delete', function () {
  it('Should prevent deadpool from deleting Nightwing product', function(done) {
    request(app).delete('/api/v2/products/Nightwing/delete')
    .auth('deadpool', 'skullpoopl')
    .expect(401)
    .end(done)
  })
  it('Should allow oracle to delete the Nightwing product', function(done) {
    request(app).delete('/api/v2/products/Nightwing/delete')
    .auth('oracle', 'oracle')
    .expect(200)
    .expect({
      "delete": "Nightwing"
    })
    .end(done)
  })
})
