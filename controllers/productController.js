var Product = require('../model/productModel');
var _ = require('underscore');

exports.createOrUpdateProduct = function (req, res) {
    var productObj = req.body;
    var id = productObj._id;
    var _product;

    var pic = req.files.shares;
    var picName = "";
    if (pic !== undefined && pic !== ""){
        picName = pic.name.replace('.', '_'+Date.now()+'.');
        pic.mv('./public/uploadPic/' + picName, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        });

        productObj.shares = [];
        productObj.shares.push(picName);
    }




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
            poster: productObj.poster,
            type: productObj.type,
            season: productObj.season,
            status: productObj.status,
            shares: productObj.shares,
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
                res.send({code:200})
                // res.redirect('/product/list')
            }
        })

    }
};

//DNU - Integrate in createOrUpdate
exports.uploadShares = function (req, res) {
    var pic = req.files.shares;
    var picName = pic.name.replace('.', '_'+Date.now()+'.');
    pic.mv('./public/uploadPic/' + picName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    })
};

