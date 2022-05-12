const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    limit: {
        type: Number,
        required: true
    },
    valid: {
        type: Date,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        max: 100
    }
});

const coupon = mongoose.model('coupon', couponSchema);

module.exports = coupon;