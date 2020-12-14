var express = require('express');
var router = express.Router();
const resultController = require('../controller/resultController')

router.get('/', resultController.displayShortUrl)
router.post('/', resultController.postUrl);
router.get('/:shortUrl', resultController.redirectUrl);

module.exports = router