var express = require('express');
var router = express.Router();
var Product = require('../model/productModel');

//Home Page
router.get('/', function (req, res) {
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

//Product List Page
router.get('/product/list', function (req, res) {
    Product.fetch(function (err, products) {
        if (err){
            console.log(err);
        }
        res.render('list', {
            title: 'Skin Care List',
            products: products
        })
    })
});

//Add Product Page
router.get('/product/create', function (req, res) {
    res.render('admin', {
        title: 'Add Product',
        product: {}
    })
});



//View Product Page
router.get('/product/:id', function (req, res) {
    var id = req.params.id;

    Product.findById(id, function (err, product) {
        res.render('detail', {
            title: product.name,
            product: product
        })
    });
});

//Update Product Page
router.get('/product/update/:id', function (req, res) {
    var id = req.params.id;

    if (id){
        Product.findById(id, function (err, product) {
            if (err){
                console.log(err);
            } else {
                res.render('admin', {
                    title: 'admin update',
                    product: product
                })
            }
        })
    }
});

module.exports = router;