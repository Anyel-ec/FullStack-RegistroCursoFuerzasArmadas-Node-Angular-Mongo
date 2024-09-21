const express = require('express');
const router = express.Router();
const loadDataController = require('./../controller/loadDataController');

router.get('/gender', loadDataController.getGender);
router.get('/province', loadDataController.getProvinces);
router.get('/command', loadDataController.getCommandType);

module.exports = router;
