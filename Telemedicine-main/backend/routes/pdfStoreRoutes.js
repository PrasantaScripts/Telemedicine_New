const express = require("express");
const { pdfPost, fetchAllPdf } = require("../controllers/pdfController");

const router = express.Router();

router.post("/:registrationP/:pdfLink", pdfPost);
router.post("/fetchAllPdf", fetchAllPdf);

module.exports = router;
