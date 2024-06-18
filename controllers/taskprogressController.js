//  contains logic for handling player-related operation
const taskprogressModel = require("../models/taskprogressModel.js");

// API endpint 11
module.exports.createTaskProgress = (req, res) => {
    // check if required fields are present in the request body
    if (req.body.user_id == undefined) {
        res.status(400).send("Error: user_id is undefined");
        return;
    }
    if (req.body.task_id == undefined) {
        res.status(400).send("Error: task_id is undefined");
        return;
    }
    if (req.body.completion_date == undefined) {
        res.status(400).send("Error: completion_date is undefined");
        return;
    }
    if (req.body.notes == undefined) {
        res.status(400).send("Error: notes is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    };

    // check if user exists
    taskprogressModel.checkUserExists(data.user_id, (err, userResult) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (userResult.length === 0) {
            return res.status(404).json({ error: 'UserId not found' });
        }

        // check if task exists
        taskprogressModel.checkTaskExists(data.task_id, (err, taskResult) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (taskResult.length === 0) {
                return res.status(404).json({ error: 'TaskId not found' });
            }

            // insert task progress
            taskprogressModel.insertTaskProgress(data, (error, insertResult) => {
                if (error) {
                    return res.status(500).send({ error: 'Database error' });
                }
                res.status(201).send({
                    progress_id: insertResult.insertId,
                    user_id: data.user_id,
                    task_id: data.task_id,
                    completion_date: data.completion_date,
                    notes: data.notes
                });
            });
        });
    });
};


// API endpoint 12
module.exports.readTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
     // callback function to handle the result of selecting task progress by ID
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            // check if the task progress with the specified ID exists
            if (results.length == 0) {
                res.status(404).json({
                    message: "Progress_id not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    taskprogressModel.selectTaskProgressById(data, callback);
}

// API end point 13
module.exports.updateTaskProgressById = (req, res, next) => {
    // check if required fields are present in the request body
    if (req.body.notes == undefined) {
        res.status(400).json({
            message: "Error: notes is undefined"
        });
        return;
    }
    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error updateTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "TaskProgress not found"
                });
            } else {
                taskprogressModel.selectUpdatedProgress(data.progress_id, (err, selectResults) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        if (selectResults.length === 0) {
                            res.status(404).json({
                                message: "Updated task_progress not found"
                            });
                        } else {
                            const response = {
                                progress_id: data.progress_id,
                                user_id: selectResults[0].user_id,
                                task_id: selectResults[0].task_id,
                                completion_date: selectResults[0].completion_date,
                                notes: data.notes
                            };
                            res.status(200).json(response);
                        }
                    }
                });
            }
        }
    };
    taskprogressModel.updateTaskProgressById(data, callback);
};


// API endpoint 14
module.exports.deleteTaskProgressById = (req, res, next) => {
    // extract progress ID from the request parameters
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error deleteTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Progress_id not found"
                });
            }
            else res.status(204).send();
        }
    }
    taskprogressModel.deleteTaskProgressById(data, callback);
}

// API endpoint 15
module.exports.readTaskProgressByUserIdAndTaskId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if(error){
            console.error("Database error:", error);
            return res.status(500).json({ error: 'Database error'});
        } else {
            if(results.length === 0) {
                return res.status(404).json({ message: 'Task Progress not found'});
            }
            else res.status(200).json(results);
        }
    }
    taskprogressModel.selectTaskProgressByUserIdAndTaskId(data, callback);
}
