var express = require('express');
var router = express.Router();
const model = require('../model/result');

/* GET home page. */
router.get('/', async(req, res, next) => {
  const result = await model.readUrls(req);
  res.render('main', {shortUrls : result});
});

router.use('/result', require('./result'));

module.exports = router;
