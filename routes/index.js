var express = require('express');
var validator = require('express-validator');
var router = express.Router();

/* GET home page. */
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
    if (errors.isEmpty()) {
      res.send('Successfully registered');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
