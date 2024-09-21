const express = require("express");
const router = express.Router();
const sendEmail = require("../controller/sendEmailController");

router.post("/register", sendEmail.register);
router.post("/registerDenied", sendEmail.registerDenied);
router.post("/uploadDocument", sendEmail.uploadDocument);
router.post("/uploadDocumentDenied", sendEmail.registerDenied);
router.post("/endProcessSuccess", sendEmail.uploadDocumentDenied);

module.exports = router;
