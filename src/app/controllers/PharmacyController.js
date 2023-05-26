
const accConnection = require("../../config/db/account.js");
const jwt = require('jsonwebtoken');
const QUERY = require("../models/wdtquery")
const sendEmail=require("../../services/emailService")
const time=require("../../services/currentTimeService")
require("dotenv").config();

class ScheduleController{

   allPharmacy(req,res){
    let pharmacy=async() =>{
      try{
        var result = (await accConnection.query(QUERY.SELECT_INFO_PHARMACY))[0]
        res.status(200).json(result)
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    pharmacy()
   }

   pharmacyMedicine(req,res){
    let medicine=async() =>{
        try{
          var result = (await accConnection.query(QUERY.SELECT_SPECIFIC_PHARMACY,req.body.pharmacyName))[0]
          res.status(200).json(result)
        }
        catch(err){
          res.status(404).send(err)
        }
      }
      medicine()
   }
}

module.exports=new ScheduleController()