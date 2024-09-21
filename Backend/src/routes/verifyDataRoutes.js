const express = require('express');
const router = express.Router();
const verifyDataController = require('../controller/verifyDataController');

router.get('/', verifyDataController.getRelationsVerifyData);
router.put('/:id', verifyDataController.updateVerifyData);
router.delete('/:id', verifyDataController.deleteVerifyData);

module.exports = router;