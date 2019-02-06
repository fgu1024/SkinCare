var mongoose = require('mongoose');
var ProductSchema = require('../schemas/productSch');
var Product = mongoose.model('product', ProductSchema, 'product');



// Product.find(function (err, result) {
//     if(err){
//         console.log(err)
//     } else {
//         return result;
//     }
// });

module.exports = Product;