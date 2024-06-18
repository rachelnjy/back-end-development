const timemachinesModel = require("../../models/sectionB/timemachinesModel.js");

// endpoint 7
module.exports.readAllTimeMachines = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTimeMachines:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    timemachinesModel.selectAllTimeMachines(callback);
},

// endpoint 8
module.exports.createNewTimeMachines = (req, res, next) => {
    if (req.body.Name == undefined) {
        res.status(400).send("Error: Name is undefined");
        return;
    }
    if (req.body.Description == undefined) {
        res.status(400).send("Error: Description is undefined");
        return;
    }
    if(req.body.EraID == undefined) {
        res.status(400).send("Error: EraID is undefined");
        return;
    }
    const data = {
        Name: req.body.Name,
        Description: req.body.Description,
        EraID: req.body.EraID
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTimeMachine:", error);
            res.status(500).json(error);
        } else {
            if (results.affectRows === 0) {
                // task or user not found
                res.status(404).json({
                    message: "MachineID or TaskID does not exist,"

                });
            } else {
                res.status(201).json({
                    MachineID: `${results.insertId}`,
                    Name: `${req.body.Name}`,
                    Description: `${req.body.Description}`,
                    EraID: `${req.body.EraID}`
                });
            }
        }
    };
    timemachinesModel.insertSingleTimeMachine(data, callback);
}
