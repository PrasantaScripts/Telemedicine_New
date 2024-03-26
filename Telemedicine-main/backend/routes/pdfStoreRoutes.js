const express = require("express");
const { pdfPost, fetchAllPdf } = require("../controllers/pdfController");

const router = express.Router();

router.post("/pdfdetails/:registrationP", pdfPost);
router.post("/fetchAllPdf", fetchAllPdf);

module.exports = router;
