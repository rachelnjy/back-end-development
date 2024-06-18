const pool = require('../../services/db');

// endpoint 9.1
module.exports.insertSingleChallenges = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Challenges (Name, Description, PointsReward)
        VALUES ( ?, ?, ?);
    `;

    const VALUES = [data.Name, data.Description, data.PointsReward];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// endpoint 9.2
module.exports.selectChallengesByEraId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT c.ChallengeID, c.Name, c.Description, c.PointsReward
    FROM Challenges c
    WHERE c.EraID = ?;
`;

    const VALUES = [data.EraID];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// endpoint 10
// If a duplicate key violation occurs (there is already a record with the same UserID and ChallengeID), it updates the existing record's Status to 'Completed'.
module.exports.insertUserChallenge = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO UserChallenges (user_id, ChallengeID, EraID, Status)
    VALUES (?, ?, ?, 'Completed')
    ON DUPLICATE KEY UPDATE Status = 'Completed';
`;

    const VALUES = [data.user_id, data.ChallengeID, data.EraID];
    console.log(data)
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUserPoints = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User u
    JOIN UserChallenges uc ON u.user_id = uc.user_id
    
    JOIN Challenges c ON uc.ChallengeID = c.ChallengeID
    SET u.TotalPoints = u.TotalPoints + c.PointsReward

    WHERE uc.ChallengeID = ? AND u.user_id = ?;
    `;

    const VALUES = [data.ChallengeID, data.user_id];
    console.log(VALUES);
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// endpoint 11
module.exports.selectAllChallenges = (callback) => {
    // controller calling it
    const SQLSTATMENT = ` 
    SELECT * FROM Challenges;
    `;

    pool.query(SQLSTATMENT, callback);
}