
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
          var result = (await accConnection.query(QUERY.SELECT_SPECIFIC_PHARMACY,req.query.pharmacyName))[0]
          res.status(200).json(result)
        }
        catch(err){
          res.status(404).send(err)
        }
      }
      medicine()
   }

   search(req,res){
    let find=async() =>{
        try{
          var result = (await accConnection.query(QUERY.SELECT_SEARCH,[req.body.pharmacyName,req.body.valueSearch]))[0]
          res.status(200).json(result)
        }
        catch(err){
          res.status(404).send(err)
        }
      }
      find()
   }

   order(req,res){
    let book=async() =>{
        try{
          console.log(req.body.medicines);
          for (let i=0;i<req.body.medicines.length;i++){
              var number = (await accConnection.query(QUERY.SELECT_NUMBER_MEDICINE,[req.body.medicines[i].pharmacyName,req.body.medicines[i].medicineName]))[0][0]
              console.log(number);
              if(number.number - req.body.medicines[i].number<0)
              {
                res.status(409).send("The current number of this medicine cannot serve your order. Please try again sometimes later")
              }
        }
          for (let i=0;i<req.body.medicines.length;i++){
              await accConnection.query(QUERY.UPDATE_NUMBER_MEDICINE,[req.body.medicines[i].number,req.body.medicines[i].pharmacyName,req.body.medicines[i].medicineName])
        }
            res.status(200).send("You have ordered successfully")
        }
        catch(err){
          res.status(404).send(err)
        }
      }
      book()
   }
}

module.exports=new ScheduleController()