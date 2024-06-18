const messagemodel = require("../../models/message/messageModel");

module.exports.createMessage = (req, res, next) => {
    if (req.body.message_text == undefined || req.body.message_text == "") {
        res.status(400).send("Error: message_text is undefined");
        return;
    }
    else if (req.body.userid == undefined) {
        res.status(400).send("Error: user_id is undefined");
    }

    const data = {
        userid: req.body.userid,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMesssage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results)
        }
    }
    messagemodel.insertSingleMessage(data, callback);
}

module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    messagemodel.selectAllMessages(callback);
}

module.exports.readMessageById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    messagemodel.selectMessageById(data, callback);
}

module.exports.updateMessageById = (req, res, next) => {
    if(req.params.id == undefined) 
    {
        res.status(400).send("Error: id is undefined");
        return;
    }
    else if(req.body.message_text == undefined || req.body.message_text == "")
    {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }
    else if(req.params.user_id == undefined)
    {
        res.status(400).send("Error: userid is undefined");
        return;
    }

    const data = {
        id: req.params.id,
        userid: req.params.user_id,
        message_text: req.body.message_text
    }
    console.log(data)
    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    messagemodel.updateMessageById(data, callback);
}

module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        userid: req.params.user_id,
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if(error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    messagemodel.deleteMessageById(data, callback);
}