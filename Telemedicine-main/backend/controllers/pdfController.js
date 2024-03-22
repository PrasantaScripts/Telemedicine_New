const Patient = require("../model/patientSchema");
const PdfStore = require("../model/pdfStoreSchema"); // Import the PdfStore schema/model

const pdfPost = async (req, res) => {
  const { registrationP } = req.params;
  const { pdfLink } = req.params;
  const decodedPdfLink = decodeURIComponent(pdfLink);
  try {
    const patient = await Patient.findOne({
      "patientData.registrationP": registrationP,
    });

    if (!patient) {
      console.log("Patient not found");
      return res.status(404).json({ msg: "Patient not found" });
    }
    const patientData = patient.patientData;

    // Check if patientData already exists in PdfStore
    let pdfStore = await PdfStore.findOne({
      "patientData.registrationP": registrationP,
    });

    // If patientData does not exist in PdfStore, create a new PdfStore document
    if (!pdfStore) {
      console.log("Patient data not found in PdfStore, creating new entry...");
      pdfStore = new PdfStore({
        patientData: patientData,
        pdfLinks: [pdfLink],
      });
    } else {
      // Add PDF link to the existing PdfStore document
      console.log("Patient data found in PdfStore, updating existing entry...");
      pdfStore.pdfLinks.push(decodedPdfLink);
    }

    // Save the PdfStore document
    await pdfStore.save();
    console.log("PDF link saved successfully");
    res.status(200).json({ message: "PDF uploaded successfully!" });
  } catch (error) {
    console.error("Error storing PDF link:", error);
    res.status(500).json({ error: error.message });
  }
};

const fetchAllPdf = async (req, res) => {
  const { id } = req.body;
  const data = await PdfStore.findOne({ "patientData.ticketId": id });
  if (data) {
    res.status(201).json(data);
  } else {
    res.status(404).json({ msg: "No files found for this user." });
  }
};

module.exports = {
  pdfPost,
  fetchAllPdf,
};
