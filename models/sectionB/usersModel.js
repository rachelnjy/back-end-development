const pool = require('../../services/db');

// middleware usage
module.exports.validateUser = (data, callback) => {
    const SQLSTATEMENT = `SELECT * FROM users 
                        WHERE Username = ? AND Password = ?`;

    const VALUES = [data.Username, data.Password];
    pool.query(SQLSTATEMENT, VALUES, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // If a user with the given username and password exists, return true
        callback(null, results.length > 0);
    });
};

// endpoint 1
// insert into new user with totalpoints set to 0
module.exports.insertSingleUser = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Users (Username, Email, Password, TotalPoints)
        VALUES (?, ?, ?, 0);
    `;

    const VALUES = [data.Username, data.Email, data.Password, data.TotalPoints];
    pool.query(SQLSTATMENT, VALUES, callback);
},

    // check if email exsist
    module.exports.emailExistsQuery = (Email, callback) => {
        const SQLSTATEMENT = `
    SELECT * FROM Users
        WHERE Email = ?
    `;

        const VALUES = [Email];
        pool.query(SQLSTATEMENT, VALUES, callback);
    }

// check if username exists
module.exports.usernameExistsQuery = (Username, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Users
        WHERE Username = ?
`;

    const VALUES = [Username];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// endpoint 2
module.exports.selectUserQuery = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Users
    WHERE Username = ? AND Password = ?
    `;

    const VALUES = [data.Username, data.Password];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// endpoint 3
module.exports.selectByUserProfileId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Users
    WHERE UserId = ?;
`;
    const VALUES = [data.UserId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// endpoint 4
module.exports.updateUserProfileById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Users
    set Username = ?, Email = ?, Password = ?
    WHERE UserId = ?
    `;

    const VALUES = [data.Username, data.Email, data.Password, data.UserId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.checkUsernameandEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Users
    WHERE Username = ? OR Email = ?
    `;

    const VALUES = [data.Username, data.Email];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// endpoint 5
module.exports.deleteUserProfileById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Users 
    WHERE UserId = ?;
`;
    const VALUES = [data.UserId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// endpoint 11
module.exports.selectPointsByUser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT TotalPoints From Users
    WHERE UserId = ?;
    `;

    const VALUES = [data.UserId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// endpoint 12
module.exports.selectUserByUsername = (Username, callback) => {
    const SQLSTATMENT = `
    SELECT 
    u.Username, 
    u.Email, 
    u.TotalPoints, 
    GROUP_CONCAT(c.Description) as CompletedChallenges
    FROM 
        Users u
    LEFT JOIN 
        UserChallenges uc ON u.UserID = uc.UserID AND uc.Status = 'Completed'
    LEFT JOIN 
        Challenges c ON uc.ChallengeID = c.ChallengeID
    WHERE 
        u.Username LIKE ?
    GROUP BY 
        u.UserID;
`;

    const VALUES = [`%${Username}%`];
    pool.query(SQLSTATMENT, VALUES, callback);
};


// endpoint 13
module.exports.selectLeaderboard = (data, callback) => {
    const SQLSTATMENT = `
    SELECT Username,TotalPoints
    FROM Users
    ORDER BY TotalPoints DESC
    LIMIT ?
    `;

    const VALUES = [parseInt(data.limit)];
    pool.query(SQLSTATMENT, VALUES, callback);
}

