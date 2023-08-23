const asyncHandler = require('express-async-handler');
const MedicineStorage = require('../model/medicineSchema');
const MedicineLogs = require('../model/medicineLogs');

const getMedicines=asyncHandler(async(req,res) => {
    const data=await MedicineStorage.find()
    res.send(data)
})
const changeNumber = asyncHandler(async (req,res)=>{
    const {query,id} = req.body;
    const medicine = await Medicine.findOneAndUpdate({_id:id},{quantity:query})
    const medicines = await Medicine.find({});
    res.status(201).json(medicines);
})
const add = asyncHandler(async(req,res)=>{
    const {csvData,user} = req.body;
    for(var i = 0;i<csvData.length;i++){
        const med = {
            name1: csvData[i][0],
            name2: csvData[i][1],
            quantity: csvData[i][2],
            txt: csvData[i][3],
        }
        if(!med.name1){
            continue;
        }
        const isPresent = await Medicine.find({name1:med.name1})
        var medicine;
        var logs;
        if(isPresent.length===0){
            medicine = await Medicine.create(med)
            logs = await MedicineLogs.create({
                name:med.name1,
                add:med.quantity,
                changer:user.userID,
            })
        }
        else{
            medicine = await Medicine.findOne({name1:med.name1});
            if(med.quantity!=medicine.quantity){
                logs = await MedicineLogs.create({
                    name:med.name1,
                    add:med.quantity-medicine.quantity,
                    changer:user.userID,
                })
            }
            medicine = await Medicine.findOneAndUpdate({name1:med.name1},{quantity:med.quantity})
        }
    }
    const medicines = await Medicine.find({})
    res.status(201).json(medicines)
})

const fetchLogs = asyncHandler(async (req,res)=>{
    const logs = await MedicineLogs.find({});
    if(logs){
        res.json(logs);
    }
    else{
        res.status(500);
        console.log("error");
    }
})

module.exports={getMedicines,fetchLogs,add,changeNumber}