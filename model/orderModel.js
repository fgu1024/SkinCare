var mongoose = require('mongoose');
var ProductSchema = require('../schemas/productSch');
var Product = mongoose.model('product', ProductSchema, 'product');

module.exports = Product;