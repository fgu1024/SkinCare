var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('underscore');
var Product = require('./model/productModel');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/Product', function (err, db) {
    if (err){
        console.log(err);
    } else{
        console.log('DB Connected!');
        // db.close();
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.set('views',  './views/pages');
app.set('view engine', 'pug');
//表单数据格式化
app.use(bodyParser.json());
//加了之后网页无响应，进不了app.get('/') - why??
// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'application/json ')
// });
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); //获取静态文件的目录，即head中css和js的路径，__dirname是当前文件目录
app.locals.moment = require('moment');
app.listen(port);

console.log('website started on port ' +  port);

// index page
app.get('/', function (req, res) {
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

//detail page
app.get('/product/:id', function (req, res) {
    var id = req.params.id;

    Product.findById(id, function (err, product) {
        res.render('detail', {
            title: product.name,
            product: product
        })
    });
});

//admin post add or update
app.post('/admin/product/new', function (req, res) {
    var productObj = req.body.product;
    var id = productObj._id;
    var _product;

    if (id !== undefined && id !== ""){ //This is an update
        Product.findById(id, function (err, product) {
            if (err){
                console.log()
            }

            _product = _.extend(product, productObj); //update 'product' with the new values from 'productObj'
            _product.save(function (err, product) {
                if (err){
                    console.log(err)
                }

                res.redirect('/product/' + product._id)
            })
        })
    } else {
        _product = new Product({
          name: productObj.name,
          brand: productObj.brand,
          effect: productObj.effect,
          poster: productObj.poster
        });

        _product.save(function (err, product) {
            if (err){
                console.log(err)
            }

            res.redirect('/product/' + product._id)
        })
    }
});

//admin update product page
app.get('/admin/update/:id', function (req, res) {
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

//admin page
app.get('/admin', function (req, res) {
    res.render('admin', {
        title: 'Add Product',
        product: {}
    })
});

// list page
app.get('/admin/list', function (req, res) {
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

// list delete product
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    
    if (id){
        Product.remove({_id: id}, function (err, product) {
            if (err) {
                console.log();
            } else{
                res.json({success: 1})
            }
        })
    }
});