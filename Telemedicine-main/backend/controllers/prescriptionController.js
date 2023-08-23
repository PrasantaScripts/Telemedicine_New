const asyncHandler = require('express-async-handler');
const Patient = require('../model/patientSchema');
const Prescription = require('../model/prescriptionSchema');

const addPrescription = asyncHandler(async (req,res)=>{
    const {id,dateMade,symptoms,instructions,diagnosis,arr,number,date,tests,other} = req.body;
    
    const patient = await Patient.findOne({"patientData.ticketId":id});
    if(!patient){
        res.status(400).send("not Found");
    }
    const patientData = patient.patientData;
    const prescription = await Prescription.create({
        id,
        patientData,
        dateMade,
        symptoms,
        instructions,
        diagnosis,
        medicines:arr,
        number,
        tests,
        other
    })
    if(prescription){
        if(date){
            const patient =await Patient.findOneAndUpdate({"patientData.ticketId":id},{appointedTime:date});
            if(patient){
                res.status(201).json(patient);
            }
            else{
                res.send("failed")
            }
        }
        else{
            const patient = await Patient.findOneAndUpdate({"patientData.ticketId":id},{isVisited:"true"});
        }
        res.status(201).send("ok")
    }
    else{
        res.send("failed")
    }
})

const fetchPrescription = asyncHandler(async(req,res)=>{
    const {id} = req.body;
    const prescriptions = await Prescription.find({id:id})
    if(prescriptions){
        res.status(201).json(prescriptions)
    }
    else{
        res.status(500).send("failed");
    }
})

const fetchAllPres = asyncHandler(async (req,res)=>{
    const prescriptions = await Prescription.find({})
    if(prescriptions){
        res.status(201).json(prescriptions)
    }
    else{
        res.status(500).send("failed");
    }
})

module.exports = {addPrescription,fetchPrescription,fetchAllPres}