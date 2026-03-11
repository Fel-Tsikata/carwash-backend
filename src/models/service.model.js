const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;