const express = require('express');
const router = express.Router();
const erasController = require('../../controllers/sectionB/erasController');

router.get('/eras', erasController.readAllEras); // endpoint 6



module.exports = router;