var Product = require('../model/productModel');
var _ = require('underscore');

exports.createOrUpdateProduct = function (req, res) {
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
};

exports.deleteProduct = function(req, res){
    var id = req.query.id;

    if (id){
        Product.deleteOne({_id: id}, function (err) {
            if (err) {
                console.log();
            } else{
                console.log('Delete');
                res.redirect('product/list')
            }
        })

    }
};

exports.uploadShares = function (req, res) {
    var pic = req.files.shares;
    pic.mv('./public/uploadPic/123.jpg', function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.redirect('back')
    })
};

