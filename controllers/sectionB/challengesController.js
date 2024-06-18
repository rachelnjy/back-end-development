const challengesModel = require("../../models/sectionB/challengesModel.js");

// endpoint 9.1
// post new challenges
module.exports.createNewChallenges = (req, res, next) => {
    if (req.body.Name == undefined) {
        res.status(400).send("Error: Name is undefined");
        return;
    }
    if (req.body.Description == undefined) {
        res.status(400).send("Error: Description is undefined");
        return;
    }
    if (req.body.PointsReward == undefined) {
        res.status(400).send("Error: PointsReward is undefined");
        return;
    }
    const data = {
        Name: req.body.Name,
        Description: req.body.Description,
        PointsReward: req.body.PointsReward
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewchallenges:", error);
            res.status(500).json(error);
        } else {
            if (results.affectRows === 0) {
                // challenges not found
                res.status(404).json({
                    message: "ChallengesID does not exist,"

                });
            } else {
                res.status(201).json({
                    message: "Challenge created successfully",
                    ChallengeID: results.insertId
                });
            }
        }
    };
    challengesModel.insertSingleChallenges(data, callback);
}

// endpoint 9.2s
// Retrieve a list of challenges available in a specific era
module.exports.readChallengesByEraId = (req, res, next) => {
    const data = {
        EraID: req.params.EraID
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readChallengesByEraId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "EraID does not exist"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    challengesModel.selectChallengesByEraId(data, callback);
}

// endpoint 10
// Mark a challenge as completed by a user and award points.
module.exports.MarkChallengeCompleted = (req, res, next) => {
    const data = {
        ChallengeID: req.params.ChallengeID,
        EraID: req.params.EraID,        
        user_id: req.params.user_id // assumed userID is passed in the body
    };

    challengesModel.insertUserChallenge(data, (error, results) => {
        if (error) {
            console.error("Error completing challenge:", error);
            return res.status(500).json({
                message: "Error completing challenge"
            });
        }

        // On successful completion, update user points
        updateUserPoints(req, res, next);
    });
};

 function updateUserPoints (req, res, next) {
    const data = {
        ChallengeID: req.params.ChallengeID,
        user_id: req.params.user_id // assumed userID is passed in the body
    };

    challengesModel.updateUserPoints(data, (error, results) => {
        if (error) {
            console.error("Error updating user points:", error);
            return res.status(500).json({
                message: "Error updating user points"
            });
        }

        // Send response after updating points
        res.status(200).json({
            message: "User points updated successfully"
        });
    });
};


// API endpoint 11
module.exports.readAllChallenges = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    challengesModel.selectAllChallenges(callback);
}


