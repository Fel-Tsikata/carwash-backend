const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    notes:{
        type: String,
        default: ""
    }
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;