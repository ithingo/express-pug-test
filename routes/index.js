var express = require('express');
var mongoose = require('mongoose');

var validator = require('express-validator');
var router = express.Router();

var path = require('path');
var auth = require('http-auth');

var basic = auth.basic({ file: path.join(__dirname, '../users.htpasswd') });

var Registration = mongoose.model('Registration');

router.get('/', function(req, res, next) {
  res.render('form', { title: 'Registration form' });
});

router.post('/',
  // validators
  [
    validator
      .body('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    validator
      .body('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  function(req, res) {
    var errors = validator.validationResult(req);
    var registration = new Registration(req.body);
    if (errors.isEmpty()) {
      registration
        .save()
        .then(() => res.send('Thanks for registration'))
        .catch(() => res.send('something wrong'));
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get('/registrations', auth.connect(basic), function(req, res) {
  Registration
    .find()
    .then(registrations => res.render('index', { title: 'Listing all registrations' }))
    .catch(() => res.send('something wrong'));  
});

module.exports = router;
