//  contains logic for handling task-related operation
const taskModel = require("../models/taskModel.js");

// API endpoint 6
module.exports.createNewTasks = (req, res, next) => {
    // check if required fields are present in the request body
    if (req.body.title == undefined) {
        res.status(400).send("Error: title is missing");
        return;
    }
    if (req.body.description == undefined) {
        res.status(400).send("Error: description is missing");
        return;
    }
    if (req.body.points == undefined) {
        res.status(400).send("Error: points is missing");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    // callback function to handle the result of inserting a new task
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            // respond with created task details
            res.status(201).json({
                task_id: `${results.insertId}`,
                title: `${req.body.title}`,
                description: `${req.body.description}`,
                points: `${req.body.points}`
            });
        }
    }
    taskModel.insertSingleTask(data, callback);
}

// API endpoint 7
module.exports.readAllTasks = (req, res, next) => {
     // callback function to handle the result of selecting all task
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        }
        // respond with an array of task
        else res.status(200).json(results);
    }
    taskModel.selectAllTasks(callback);
}

// API endpoint 8
module.exports.readTaskById = (req, res, next) => {
    // extract task ID 
    const data = {
        task_id: req.params.task_id
    }
    // callback function to handle the result of selecting a task by id
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task_Id does not exist"
                });
            }
            // respond with details of selected task 
            else res.status(200).json(results[0]);
        }
    }
    taskModel.selectTaskById(data, callback);
}


// API endpoint 9
module.exports.updateTaskById = (req, res, next) => {
    // check if required fields are present in the request body
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Error: title,description or points is missing"
        });
        return;
    }
    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    // callback function to handle the result of updating a task by id
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task_Id not found"
                });
            }
            else res.status(200).json({
                task_id: data.task_id,
                title: data.title,
                description: data.description,
                points: data.points
            });
        }
    }
    taskModel.updateTaskById(data, callback);
}

// API endpoint 10
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    // callback function to handle the result of deleting a task by ID
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task_Id not found"
                });
            }
            else res.status(204).send();
        }
    }
    taskModel.deleteTaskById(data, callback);
}

// fetch uncompleted task
module.exports.fetchUncompletedTasks = (req, res) => {
    const data = {
        user_id: req.params.user_id,
    }
        taskModel.fetchUncompletedTasksForUser(data, (error, tasks) => {
        if (error) {
            res.status(500).send("Server error");
        } else {
            res.json(tasks);
        }
    });
};

// fetch completed task
module.exports.fetchCompletedTasks = (req, res) => {
    const data = {
        user_id: req.params.user_id,
    }
    taskModel.fetchCompletedTasksForUser(data, (error, tasks) => {
        if (error) {
            res.status(500).send("Server error");
        } else {
            res.json(tasks);
        }
    });
};

// mark task as completed
module.exports.markTaskAsCompleted = (req, res) => {

    const data = {
        user_id: req.params.user_id,
        task_id: req.params.task_id
    }

    taskModel.markTaskAsCompleted(data, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send("Server error");
        } else {
            res.status(201).send("Task marked as completed");
        }
    });
};