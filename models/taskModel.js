const pool = require('../services/db');

// API endpoint 6
module.exports.insertSingleTask = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);
    `;

    const VALUES = [data.title, data.description, data.points];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 7
module.exports.selectAllTasks = (callback) => {
    // controller calling it
    const SQLSTATMENT = ` 
    SELECT * FROM Task;
    `;

    pool.query(SQLSTATMENT, callback);
}

// API endpoint 8
module.exports.selectTaskById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
`;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// API endpoint 9
module.exports.updateTaskById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Task
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;

    const VALUES = [data.title, data.description, data.points, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// API endpoint 10
module.exports.deleteTaskById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM Task
    WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// fetch uncompleted task
module.exports.fetchUncompletedTasksForUser = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task 
        WHERE task_id NOT IN (
            SELECT task_id FROM CompletedTasks WHERE user_id = ?
        );
    `;
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

// fetch completed task
module.exports.fetchCompletedTasksForUser = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM task T
        INNER JOIN CompletedTasks CT ON T.task_id = CT.task_id
        WHERE CT.user_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.markTaskAsCompleted = (data, callback) => {
    const insertStatement = `
        INSERT INTO CompletedTasks (user_id, task_id)
        VALUES (?, ?);
    `;
    
    const updateStatement = `
        UPDATE User
        SET TotalPoints = TotalPoints + 
            (SELECT points 
            FROM Task 
            WHERE Task.task_id = ?)
        WHERE user_id = ?;
    `;
    
    const insertValues = [data.user_id, data.task_id];
    const updateValues = [data.task_id, data.user_id];

    pool.query(insertStatement, insertValues, (error, results) => {
        if (error) {
            callback(error);
        } else {
            pool.query(updateStatement, updateValues, callback);
        }
    });
};
