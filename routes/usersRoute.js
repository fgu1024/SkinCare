var express = require('express');
var router = express.Router();
var Product = require('../model/productModel');

// index page
router.get('/admin', function (req, res) {
    Product.fetch(function (err, products) {
        if (err){
            console.log(err);
        }
        res.render('index', {
            title: 'Skin Care',
            products: products
        })
    })
});

module.exports = router;