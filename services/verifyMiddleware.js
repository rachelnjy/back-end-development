const usersModel = require('../models/sectionB/usersModel')

module.exports.verifyMiddleware = (req, res, next) => {
    const data = {
        Username: req.body.Username,
        Password: req.body.Password
    }
    if (!data.Username || !data.Password) {
        return res.status(401).send('Access denied. Username and password are required.');
    }

    usersModel.validateUser(data, (err, isValid) => {
        if (err) {
            console.error('Error in user validation', err);
            return res.status(500).send('Internal server error.');
        }

        if (isValid) {
            next(); // User is valid, proceed to the next middleware
        } else {
            res.status(401).send('Access denied. Invalid credentials.');
        }
    });
}