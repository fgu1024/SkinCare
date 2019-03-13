var mongoose = require('mongoose');
var ProductTypeSchema = require('../schemas/productTypeSch');
var ProductType = mongoose.model('productType', ProductTypeSchema, 'product_type');

module.exports = ProductType;
