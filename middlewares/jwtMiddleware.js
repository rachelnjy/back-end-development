//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();
//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
// const tokenDuration = process.env.JWT_EXPIRES_IN;
// const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
// to generate token
module.exports.generateToken = (req, res, next) => {
    // Check if user data is available
    if (!res.locals.user) {
        return res.status(500).json({ error: "User data not available for token generation" });
    }

    const user = res.locals.user; // User data from controller

    const payload = {
        user_id: user.user_id, // Assuming user object has a user_id field
        role: user.role, // Include the user's role in the payload
        timestamp: new Date()
    };

    const options = {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN
    };

    jwt.sign(payload, process.env.JWT_SECRET_KEY, options, (err, token) => {
        if (err) {
            console.error("Error generating token:", err);
            return res.status(500).json({ error: "Error generating token" });
        } else {
            res.locals.token = token; // Store token in res.locals for further use
            next(); // Proceed to next middleware or controller action
        }
    });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
    res.status(200).json({
        message: res.locals.message,
        token: res.locals.token
    });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({error: "No token provided"});
    }
    // const token = authHeader.replcae("Bearer ", "");
    // const token = authHeader.split(" ")[1];
    const token = authHeader.substring(7); //remove "bearer" to get raw token

    if(!token) {
        return res.status(401).json({error: "No token provided"});
    }

    const callback = (err, decoded) => {
        if(err) {
            return res.status(401).json({error: "Invalid token"});
        }
        res.locals.userId = decoded.userId;
        res.locals.tokenTimestamp = decoded.timestamp;

        next();
    };
    jwt.verify(token, secretKey, callback);
};
