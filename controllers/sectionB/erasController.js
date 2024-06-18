const erasModel = require("../../models/sectionB/erasModel.js");

// endpoint 5
module.exports.readAllEras = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllEras:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    erasModel.selectAllEras(callback);
}