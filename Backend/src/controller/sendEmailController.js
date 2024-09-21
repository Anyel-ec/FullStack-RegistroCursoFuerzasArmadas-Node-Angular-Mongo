const emailService = require("../services/emailService");

const register = (req, res) => {
  const userEmail = req.body.email;
  emailService.sendEmail(userEmail, "Real Agency", "register");
};

const registerDenied = (req, res) => {
  const userEmail = req.body.email;
  emailService.sendEmail(userEmail, "Real Agency", "registerDenied");
};

const uploadDocument = (req, res) => {
  const userEmail = req.body.email;
  emailService.sendEmail(userEmail, "Real Agency", "uploadDocument");
};


const uploadDocumentDenied = (req, res) => {
  const userEmail = req.body.email;
  emailService.sendEmail(userEmail, "Real Agency", "uploadDocumentDenied");
};

const endProcessSuccess = (req, res) => {
  const userEmail = req.body.email;
  emailService.sendEmail(userEmail, "Real Agency", "endProcessSuccess");
};


module.exports = {
  register, registerDenied, uploadDocument, uploadDocumentDenied, endProcessSuccess
};
