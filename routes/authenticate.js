const express = require('express');
const router = express.Router();

const authCheck = require('./check');
const authProds = require('./products');
const authServices = require('./services');
const authOrders = require('./orders')

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

const models = require('../models');
const usersDb = models.users;

const genHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, next) {
  next(null, user.id);
});

passport.deserializeUser(function(id, next) {
  usersDb.findById(id).then(function (user) {
    if (user) {
      next(null, user.get());
    } else {
      next(user.errors, null);
    }
  });
});

passport.use('local-signup', new Strategy ({
    passReqToCallback: true
  },
  function (req, username, password, next) {
    console.log('setting up new login strategy');
    usersDb.findOne({
      where: {
        username: username
    }}).then(function(data) {
      if (data) {
        return next(null, false, {message: "Email already used"});
      } else {
        var userPass = genHash(password);

        let newUser = usersDb.build({
          username: username,
          email: req.body.email,
          password: userPass,
          imgSrc: req.body.picture
        })
        if (req.body.admin) {
          newUser.admin = req.body.admin;
        }
        newUser.save().then(function(newUsr, created) {
          if (!newUsr) {
            return next(null, false);
          }
          if (newUsr) {
            return next(null, newUser);
          }
        });
      }
    })
  }
));

// Passport for signing in an existing user
passport.use('local-signin', new Strategy ({
    usernameField: 'username',
    passwordField: 'password',
  },
  function(username, password, next) {
    let isValid = (usrPass, pass) => {
      return bcrypt.compareSync(pass, usrPass);
    }
    usersDb.findOne({
      where: {
        username: username
      }}).then(function(data) {
        if (!data) {
          return next(null, false, {message: 'username does not exist'});
        }

        if (!isValid(data.password, password)) {
          return next(null, false, {message: 'password is not correct'});
        }

        var usrInfo = data.get();
        return next(null, usrInfo);
      }).catch(function(err) {
        console.log('ERROR:', err);
        return next(null, false, {message: 'Error on login'});
      });
  }
));

passport.use('basic', new BasicStrategy(
  function(user, password, next) {
    // console.log('Attempting basic strategy');
    var isValid = (usrPass, pass) => {
      return bcrypt.compareSync(pass, usrPass);
    }
    usersDb.findOne({where: {username: user}})
    .then(function(user) {
        if (!user) {
          console.log('no user');
          return next(null, false);
        }
        if (!isValid(user.password, password)) {
          console.log('invalid password');
          return next(null, false);
        }
        console.log('valid user');
        return next(null, user);
      })
    .catch(function(err) {
      console.log('error validating user', err);
      return next(err, false)
    })
  })
);

router.post('/signup', function (req, res) {
  // console.log('request body:', req.body)
  usersDb.findOne({
    where: {
      username: req.body.username
  }}).then(function(data) {
    if (data) {
      return res.status(400).json({"error": "Email already used"})
    } else {
      var userPass = genHash(req.body.password);

      let newUser = usersDb.build({
        username: req.body.username,
        email: req.body.email,
        password: userPass,
        imgSrc: req.body.imgSrc
      })
      if (req.body.admin) {
        newUser.admin = req.body.admin;
      }
      newUser.save().then(function(newUsr, created) {
        if (!newUsr) {
          return res.json({
            "user": false
          })
        }
        if (newUsr) {
          return res.json({
            "user": newUser.username
          })
        }
      });
    }
  })
})

router.use(passport.authenticate('basic', {
  session: false
}), authCheck);
router.use(passport.authenticate('basic', {
  session: false
}), authOrders);
router.use(passport.authenticate('basic', {
  session: false
}), authServices);
router.use(passport.authenticate('basic', {
  session: false
}), authProds);


module.exports = router
