const pool = require('../services/db');

// API endpoint 11
module.exports.checkUserExists = (userId, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user 
    WHERE user_id = ?
    `;

    const VALUES = [userId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.checkTaskExists = (taskId, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM task 
    WHERE task_id = ?
    `;

    const VALUES = [taskId];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertTaskProgress = (data , callback) => {
    const SQLSTATMENT = `
    INSERT INTO taskprogress (user_id, task_id, completion_date, notes) 
    VALUES (?, ?, ?, ?)
    `;

    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 12
module.exports.selectTaskProgressById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
`;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 13
module.exports.updateTaskProgressById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE TaskProgress
    SET notes = ?
    WHERE progress_id = ?
`;

    const VALUES = [data.notes, data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectUpdatedProgress = (progress_id, callback) => {
    const SQLSTATMENT = `
    SELECT user_id, task_id, completion_date 
    FROM TaskProgress
    WHERE progress_id = ?
    `;

    const VALUES = [progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 14 
module.exports.deleteTaskProgressById = (data, callback) => {
    const SQLSTATEMENT =`
    DELETE FROM TaskProgress 
    WHERE progress_id = ?;
    `;

    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// API endpoint 15
module.exports.selectTaskProgressByUserIdAndTaskId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM TaskProgress
        WHERE user_id = ? AND task_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};
