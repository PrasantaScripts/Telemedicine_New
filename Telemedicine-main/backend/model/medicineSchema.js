const mongoose=require('mongoose')

const MedicineSchema = new mongoose.Schema({
    slno:{
        type: Number,
        required: true
    },
    Product_name:{
        type: String,
        required: true
    },
    Generic_name:{
        type: String,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    Price:{
        type: Number,
        required: true
    }
},{timestamp:true,collection:'medicinestorage'})

const MedicineStorage=mongoose.model('medicinestorage',MedicineSchema);
module.exports=MedicineStorage;
