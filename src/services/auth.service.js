// Handles authentication logic

// Should contain:

// registerAdmin(data)

// loginAdmin(email, password)

// generateToken(adminId)

// comparePasswords()

// What it does:

// Hash password

// Compare password

// Generate JWT

// Update lastLogin
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const  generateToken  = require("../utils/generateToken");

const registerAdmin = async (data) =>{
    const existingAdmin = await Admin.findOne({email: data.email});

    if(existingAdmin){
        throw new Error("User already exists")
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password,saltRounds);

    const admin = await Admin.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        phoneNumber: data.phoneNumber
    });
    return admin;
};
const loginAdmin = async(data)=>{
    const admin = await Admin.findOne({email: data.email});

    if(!admin){
        throw new Error("User does not have an account")
    }

    const isMatch = await bcrypt.compare(data.password,admin.password);
    if(!isMatch){
        throw new Error("Invalid credentials")
    }

    // update last login time
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    admin.password = undefined;
    
    return{
        token,
        admin
    };
};






module.exports ={
    registerAdmin,

}