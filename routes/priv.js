const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

const models = require('../models');
const usersDb = models.users;

const genHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
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

// Specifically for signing up a new user
passport.use('local-signup', new Strategy ({
    usernameField: 'username',
    passwordField: 'password',
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
      return bCrypt.compareSync(pass, usrPass);
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
  function(user, password, done) {
    var isValid = (usrPass, pass) => {
      return bCrypt.compareSync(pass, usrPass);
    }
    Users.findOne({
      username: user
    }, function(err, user) {
       if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!isValid(user.password, password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

router.post('/signup', function (req, res) {
  passport.authenticate('local-signup');
  res.json({
    "success": true,
    "username": req.user.username
  })
})


mondule.exports = router
