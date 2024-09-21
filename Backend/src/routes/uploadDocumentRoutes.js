const express = require('express');
const router = express.Router();
const uploadDocument = require('../controller/uploadDocumentController');

router.put('/:id', uploadDocument.updateVerifyDocument);


module.exports = router;