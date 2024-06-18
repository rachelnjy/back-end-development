const express = require('express');
const router = express.Router();

const messagecontroller = require('../../controllers/message/messageController');

router.get('/readmessage/:id', messagecontroller.readMessageById);
router.get('/readallmessages', messagecontroller.readAllMessage);

router.post('/createmessage', messagecontroller.createMessage);

router.put('/updatemessage/:id/:user_id', messagecontroller.updateMessageById);
router.delete('/deletemessage/:id/:user_id', messagecontroller.deleteMessageById);

module.exports = router;