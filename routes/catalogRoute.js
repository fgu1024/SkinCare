var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController');

router.post('/create', productController.createOrUpdateProduct);

router.post('/uploadShares', productController.uploadShares);

router.delete('/list', productController.deleteProduct);

module.exports = router;