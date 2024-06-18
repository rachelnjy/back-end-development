const usersModel = require("../../models/sectionB/usersModel.js");

// endpoint 1
// create new user
module.exports.createUser = (req, res, next) => {
    if (req.body.Username === undefined) {
        res.status(400).send("Error: Username is undefined");
        return;
    }
    if (req.body.Email === undefined) {
        res.status(400).send("Error: Email is undefined");
        return;
    }
    if (req.body.Password === undefined) {
        res.status(400).send("Error: Email is undefined");
        return;
    }
    
    // check for repeated email
    usersModel.emailExistsQuery(req.body.Email, (err, emailExistsQuery) => {
        if (err) {
            console.error("Error createUser:", err);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }

        if (emailExistsQuery.length > 0) {
            res.status(409).json({
                message: "The provided email is already associated with another user"
            });
            return;
        }

        // check for repeated username
        usersModel.usernameExistsQuery(req.body.Username, (err, usernameExistsQuery) => {
            if (err) {
                console.error("Error createUser:", err);
                res.status(500).json({
                    message: "Internal Server Error"
                });
                return;
            }
            if (usernameExistsQuery.length > 0) {
                res.status(409).json({
                    message: "The provided username is already associated with another user"
                });
                return;
            }
            const data = {
                Username: req.body.Username,
                Email: req.body.Email,
                Password: req.body.Password
            };
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error createNewUser:", error);
                    res.status(500).json(error);
                } else {
                    res.status(201).json({
                        UserID: `${results.insertId}`,
                        Username: `${req.body.Username}`,
                        Email: `${req.body.Email}`,
                        TotalPoints: 0
                    });
                }
            };
            usersModel.insertSingleUser(data, callback);
        });
    });
};

// endpoint 2
// login user
module.exports.loginUser = (req, res, next) => {
    if (req.body.Username === undefined || req.body.Password === undefined) {
        res.status(400).send("Error: Username and Password are required");
        return;
    }

    const data = {
        Username: req.body.Username,
        Password: req.body.Password
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error loginUser:", error); 
            res.status(500).json({
                message: "Internal Server Error"
            });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const user = results[0];
            res.status(200).json({
                UserId: user.UserID,
                Username: user.Username,
                Message: 'You have successfully logged in',
            });
        }
    };
    usersModel.selectUserQuery(data, callback);
};


// endpoint 3
// view user profile information
module.exports.readUserProfileById = (req, res, next) => {
    const data = {
        UserId: req.params.UserId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserProfileById", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send();
            }
            else res.status(200).json(results[0]);
        }
    }
    usersModel.selectByUserProfileId(data, callback);
}

// endpoint 4
// update user profile information
module.exports.updateUserProfileById = (req, res, next) => {
    if (req.body.Username == undefined || req.body.Email == undefined || req.body.Password == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }
    const data = {
        UserId: req.params.UserId,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password
    }
    usersModel.checkUsernameandEmail(data, (err, result) => {
        if (err) {
            console.log("Error updateUserProfileById:", err);
            res.status(500).json({
                message: "Internal Server Error"
            });
        } else if (result.length > 0) {
            res.status(409).json({
                message: "The provided username or email is already associated with another user"
            });
        } else {
            const callback = (error, results, fields) => {
                if (error) {
                    console.log("Error updateUserProfileById:", error);
                    res.status(500).json(error); //end()
                } else {
                    if (results.affectedRows == 0) {
                        res.status(404).json({
                            message: "Users not found."
                        });
                    }
                    else {
                        res.status(200).json({
                            UserId: data.UserId,
                            Username: data.Username,
                            Email: data.Email,
                            Password: data.Password
                        });
                    }
                }
            };
            usersModel.updateUserProfileById(data, callback);
        }
    });
}

// endpoint 5
module.exports.deleteUserProfileById = (req, res, next) => {
    const data = {
        UserId: req.params.UserId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserProfileById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User Profile not found"
                });
            }
            else res.status(204).json({
                message: "User Profile deleted"
            }); // 204 No Content 
        }
    }
    usersModel.deleteUserProfileById(data, callback);
}

// endpoint 11
// Retrieve the total points accumulated by a specific user.
module.exports.readPointsByUser = (req, res, next) => {
    const data = {
        UserId: req.params.UserId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPointsByUser", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).send();
            }
            else res.status(200).json({
                UserID: req.params.UserId,
                TotalPoints: results[0].TotalPoints
            });
        }
    }
    usersModel.selectPointsByUser(data, callback);
}

// endpoint 12
// GET /search/users - Search for a user by username
module.exports.readSearchUserByUsername = (req, res, next) => {
    // check if the required query parameter 'Username' is present
    if (req.query.Username == undefined) {
        res.status(400).json({
            message: "Username is required for search" 
        });
        return;
    }
    const Username = req.query.Username;
    const callback = (error, results, fields) => {
        if (error) {
             // handle database error
            console.error("Error readSearchUserByUsername", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.status(200).json(results);
            }
        }
    };
    usersModel.selectUserByUsername(Username, callback);
};


// endpoint 13
module.exports.readLeaderboard = (req, res, next) => {
    const data = {
        limit: req.query.limit || 5 //limit the number of results to 5
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error fetching leaderboard", error);
            res.status(500).json(error);
        } else {
             res.status(200).json(results);
        }
    }
    usersModel.selectLeaderboard(data, callback);
}

