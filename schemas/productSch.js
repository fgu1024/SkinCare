var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    effect: String,
    poster: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

//check before save - If new data, update both createAt and updateAt; If not, only update updateAt
ProductSchema.pre('save', function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
});

ProductSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .sort('meta.updateAt')
            .exec(cb)
    }
};

module.exports = ProductSchema;