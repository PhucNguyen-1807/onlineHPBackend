const path=require('path')
const accConnection = require("../../config/db/account.js");
const QUERY = require("../models/wdtquery")
const searchGPT=require("../../services/openai.js")

require("dotenv").config();

class EmployeeController{
    getDoctorInfo(req,res)
    {   
        let getInfo =async ()=>{
        var result =await accConnection.query(QUERY.SELECT_DOCTOR,req.query.employeeID)
        res.json(result[0][0])
        }
        getInfo()
    }
    getDS(req,res)
    {   
        let getInfo =async ()=>{
        var result =await accConnection.query(QUERY.SELECT_DS)
        res.json(result[0])
        }
        getInfo()
    }
    getAllDoctorInfo(req,res)
    {   
        let getInfo =async ()=>{
        var result =await accConnection.query(QUERY.SELECT_ALL_DOCTOR)
        res.json(result[0])
        }
        getInfo()
    }

    getAvailableTime(req,res)
    {
        let getTime =async ()=>{
            try{
                    var result = await accConnection.query(QUERY.SELECT_AVAILABLE_TIME_BY_DOCTOR,req.query.employeeID)
                    // for(let i=0;i<)
                    res.json(result[0])
                }
            catch{
                res.status(404).send(error)
            }
       }   
       getTime()
    }
    getSuitableDoctor(req,res)
    {
        let getDoc =async ()=>{
            try{
                    var specialist = (await searchGPT(req.query.comment)).trim();
                    let specialistArray = specialist.split(",");
                    let convertedArray = specialistArray.map(specialist => specialist.trim());
                    console.log(convertedArray);
                    var result = (await accConnection.query(QUERY.SELECT_DOCTOR_BY_SPECIALIST, [convertedArray]))[0];
                    console.log(result);
                    res.status(200).json(result)
                }
            catch(error){
                res.status(404).send(error)
            }
       }   
       getDoc()
    }
    addAvailableTime(req,res)
    {
        let addTime =async()=>{
            try{
                await accConnection.query(QUERY.INSERT_AVAILABLE_TIME,[req.body.employeeID,req.body.start,req.body.end,req.body.date])
                res.status(200).send("Add available time successfully")
            }
            catch(error){
                res.status(404).send(error)
            }
            }
            addTime()
    }
}

module.exports=new EmployeeController()