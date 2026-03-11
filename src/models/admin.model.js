const mongoose = require ("mongoose");

const adminSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "manager"],
        default: "admin"
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    }
}, {timestamps: true});

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;