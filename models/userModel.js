const pool = require('../services/db');

// API endpoint 1
module.exports.insertSingleUser = (data, callback) => {
    const SQLSTATMENT =`
    INSERT INTO User (username, email, password, role)
        VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.username, data.email, data.password, data.role];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.emailExistsQuery = (email, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE email = ?
    `;

    const VALUES = [email];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// API Login endpoint
module.exports.getUserByUsername = (username, callback) => {
    // SQL query to select the user by username
    const query = 'SELECT * FROM user WHERE username = ? LIMIT 1';

    // Execute the query
    pool.query(query, [username], (err, results) => {
        if (err) {
            // If an error occurs, pass the error to the callback
            callback(err, null);
        } else if (results.length === 0) {
            // No user found
            callback(null, null);
        } else {
            // User found, return the user object
            callback(null, results[0]);
        }
    });
}

// API endpoint 2
module.exports.selectAll = (callback) => {
    // controller calling it
    const SQLSTATMENT = ` 
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

// API endpoint 3
// left join put primary key onto the left side table
// inner join will only show all the rows with data if there is a null part it wont show
// group by ordering by this rows i want to see
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT user.user_id, user.username, user.email, IFNULL(SUM(user.TotalPoints), 0) AS TotalPoints
    FROM User
    WHERE user.user_id = ?
    GROUP BY user.user_id, user.username, user.email
    
`;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 4
module.exports.updateUsersById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User
    set username = ?, email = ?, password = ?
    WHERE user_id = ?
    `;

    const VALUES = [data.username, data.email, data.password, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.checkUsernameAndEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE username = ? OR email = ?
    `;
    
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATEMENT, VALUES, callback);
}



// API endpoint 5
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;
`;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}