const pool = require('../../services/db');

// endpoint 7
module.exports.selectAllTimeMachines = (callback) => {
    // controller calling it
    const SQLSTATMENT = ` 
    SELECT * FROM TimeMachines;
    `;

    pool.query(SQLSTATMENT, callback);
}

// endpoint 8
module.exports.insertSingleTimeMachine = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO TimeMachines (Name, Description, EraID)
    VALUES (?, ?, ?);
    `;

    const VALUES = [data.Name, data.Description, data.EraID];
    pool.query(SQLSTATEMENT, VALUES, callback);
}