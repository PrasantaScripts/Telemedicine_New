const mongoose = require('mongoose');

const PdfStoreSchema = mongoose.Schema({
    patientData:{
        type:Object
    },
    pdfLinks: {
        type: [String],
        default: []
    }


},{
    collection:'PdfStore',
    timestamp:true,
});

const PdfStore = mongoose.model('PdfStore',PdfStoreSchema);

module.exports = PdfStore;