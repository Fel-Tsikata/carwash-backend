const jwt = require("jsonwebtoken");

//jwt.sign(payload, secret, options)
export const generateToken = (adminId) => {
    const token = jwt.sign(
        {id: adminId},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );
    return token;
};

