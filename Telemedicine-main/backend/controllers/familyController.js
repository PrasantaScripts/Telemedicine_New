const asyncHandler = require('express-async-handler');
const Family = require('../model/familySchema');

const registerFamily = asyncHandler(async (req,res)=>{
    var { mainName,mobile,address,date,locationCode,members,education,familyIncome,maritalStatus } = req.body;
    if (!mainName || !mobile || !address || !date || !locationCode || !education || !familyIncome || !maritalStatus) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    var number = 0;
    const familyList = await Family.find({date:date}); 
    count= familyList.length;
    if(count+1<10){
        number = "000" + (count+1);
    }
    else if(count+1<100){
        number = "00"+(count+1);
    }
    else if(count+1<1000){
        number = '0'+(count+1);
    }
    else{
        number = (count+1)+"";
    }
    var today = new Date();
    var monthNo;
    if(today.getMonth()+1<10){
        monthNo = '0'+(today.getMonth()+1);
    }
    else{
        monthNo = (today.getMonth()+1)+'';
    }
    var day;
    if(today.getDate()<10){
        day = '0'+(today.getDate());
    }
    else{
        day = (today.getDate())+'';
    }
    const id = locationCode + monthNo + day + (today.getFullYear()%100) + number ;

    var memberArr=[];
    members.map((item,idx)=>{
        var data = {
            name:item.name,
            relationship:item.relationship,
            id:(id+'0'+(idx+1)),
        }
        memberArr.push(data);
    })

    members = [...memberArr];
   
    const name = mainName;

    const family = await Family.create({
        name,
        mobile,
        address,
        date,
        locationCode,
        members,
        education,
        familyIncome,
        maritalStatus,
        id,
    });
    
    if(family){
        res.status(201).json({
            id: family.id,
        })
    }
    else{
        res.status(400)
        throw new Error ("failed to create a hw")
    }

})

const fetchFamily = asyncHandler(async(req,res)=>{
    const {input,searchType} = req.body;
    var family;
    if(searchType==='Mobile Number')
        family = await Family.findOne({mobile:input});
    else
        family = await Family.findOne({id:input});

    console.log(family);

    if(family){
        res.status(201).json({
                _id: family._id,
                name: family.name,
                address: family.address,
                date: family.date,
                mobile:family.mobile,
                locationCode:family.locationCode,
                members:family.members,
                education:family.education,
                familyIncome:family.familyIncome,
                maritalStatus:family.maritalStatus,   
                id:family.id,  
        })
    }
    else{
        res.status(400)
        throw new Error ("not Found")
    }

})

const fetchTotalFamily = asyncHandler(async (req,res)=>{
    const count = await Family.countDocuments({}); 
    if(count){
        res.status(201).json({
            count:count,
        })
    }
    else{
        res.status(400)
        throw new Error("check your internet"); 
    }
})
 
module.exports = {registerFamily,fetchFamily,fetchTotalFamily};