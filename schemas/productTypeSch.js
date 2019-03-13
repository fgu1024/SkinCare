var mongoose = require('mongoose');

var ProductTypeSchema = new mongoose.Schema({
    pt_id: String,
    pt_name: String
});

ProductTypeSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = ProductTypeSchema;