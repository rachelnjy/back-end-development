//  contains logic for handling player-related operation
const userModel = require("../models/userModel.js");
const bcrypt = require('bcrypt');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// API endpoint 1 Create New Account (register)
module.exports.register = (req, res, next) => {
    const { username, email, password } = req.body;
    
    // Check for empty values
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please provide username, email, and password" });
    }

    // Check if email already exists
    userModel.emailExistsQuery(email, (err, emailExists) => {
        if (err) {
            console.error("Error in emailExistsQuery:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (emailExists.length > 0) {
            return res.status(409).json({ error: "The provided email is already associated with another user" });
        }

        const data = {
            username: username,
            email: email,
            password: res.locals.hash,
            role: 2, 
        };

        // Callback function for insertSingleUser
        const callback = (error, results) => {
            if (error) {
                console.error("Error in insertSingleUser:", error);
                return res.status(500).json({ error: "Failed to register user" });
            }
            res.status(201).json({ message: `User ${username} created successfully` });
        };

        // Insert the user into the database
        userModel.insertSingleUser(data, callback);
    });
};


// API Login endpoint
module.exports.loginUser = (req, res, next) => {
    // Check if both username and password are provided
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // Fetch user from the database by username
    userModel.getUserByUsername(req.body.username, (err, user) => {
        if (err) {
            console.error("Error loginUser:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        } else if (!user) {
            // User not found
            return res.status(401).json({ error: "Invalid credentials" });
        } else {
            // Store user details in res.locals for access in middleware
            res.locals.user = user;
            res.locals.hash = user.password;
            
            // Compare password and generate token
            bcryptMiddleware.comparePassword(req, res, () => {
                res.locals.userId = user.user_id;
                jwtMiddleware.generateToken(req, res, () => {
                    jwtMiddleware.sendToken(req, res, next);
                });
            });
        }
    });
};

//API endpoint 2
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    userModel.selectAll(callback);
}


// API endpoint 3
module.exports.readUserById = (req, res, next) => {
    // extracting user ID
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            // check if the user with the specified ID 
            if (results.length == 0) {
                res.status(404).send();
            }
            else res.status(200).json(results[0]);
        }
    }
    userModel.selectById(data, callback);
}

// API endpoint 4
const saltRounds = 10; // Define the number of salt rounds for bcrypt

module.exports.updateUsersById = (req, res, next) => {
    // Check if required fields are present
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing required data." });
    }

    // Hash the password
    bcrypt.hash(req.body.password, saltRounds, (hashError, hashedPassword) => {
        if (hashError) {
            console.error("Error hashing password:", hashError);
            return res.status(500).json({ error: "Error hashing password" });
        }

        const data = {
            user_id: req.params.user_id,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword // Store the hashed password
        };

        // Check if the provided username or email is already associated with another user
        userModel.checkUsernameAndEmail(data, (err, result) => {
            if (err) {
                console.error("Error updateUsersById:", err);
                return res.status(500).json({ message: "Internal Server Error" });
            } else if (result.length > 0) {
                return res.status(409).json({ message: "The provided username or email is already associated with another user" });
            } else {
                const callback = (error, results, fields) => {
                    if (error) {
                        console.error("Error updateUsersById:", error);
                        return res.status(500).json(error);
                    } else {
                        // Check if the user with the specified ID was found
                        if (results.affectedRows === 0) {
                            return res.status(404).json({ message: "User not found." });
                        } else {
                            return res.status(200).json({
                                user_id: data.user_id,
                                username: data.username,
                                email: data.email,
                                password: data.password
                            });
                        }
                    }
                };
                userModel.updateUsersById(data, callback);
            }
        });
    });
};


// API endpoint 5
module.exports.deleteUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User_id not found"
                });
            }
            else res.status(204).send(); // 204 No Content 
        }
    }
    userModel.deleteById(data, callback);
}

