const accConnection = require("../../config/db/account.js");
const jwt = require('jsonwebtoken');
const QUERY = require("../models/wdtquery")
const sendEmail=require("../../services/emailService")
const generateRandomString=require("../../services/stringService")
const time=require("../../services/currentTimeService")
require("dotenv").config();

class ScheduleController{
   schedule(req,res){
    // employeeId,userId,start,end,date => thăng nào time rảnh mới hiện time//check coi đã có ai đặt lịch trước chưa 
        let makeAppointment= async ()=>{
          try{
              req.body.link=`https://videocallhp.onrender.com/${generateRandomString(5)}`
              if(req.body.type==='offline')
              {
                req.body.link='NULL'
              }
              await accConnection.query(QUERY.INSERT_APPOINTMENT,[req.body.employeeID,req.body.userID,req.body.start,req.body.end,req.body.date,req.body.type,req.body.link])
              await accConnection.query(QUERY.UPDATE_AVAILABLE_TIME_FULL,[req.body.employeeID,req.body.start,req.body.date])
              var email=(await accConnection.query(QUERY.SELECT_EMAIL_USERS,req.body.userID))[0][0]
              var doctorName=(await accConnection.query(QUERY.SELECT_EMPLOYEE_NAME,req.body.employeeID))[0][0]
              var address=(await accConnection.query(QUERY.SELECT_EMPLOYEE_ADDRESS,req.body.employeeID))[0][0]
              console.log(address);
              var id=(await accConnection.query(QUERY.SELECT_APPOINTMENT_ID_LATEST,[req.body.employeeID,req.body.userID]))[0][0]
              req.body.mail=email.email;
              req.body.name=doctorName.name;
              req.body.address=address.address;
              console.log(req.body.mail);
              console.log(req.body.name);
              console.log(req.body.address);
              var token=  jwt.sign({appointmentID:id.id},process.env.SECRET)
              req.body.token=token;
              sendEmail(req.body)
              res.status(200).send('Booked Successfully')
          }
          catch(error){
            res.status(404).send(error)
          }
        }

        makeAppointment()
   }
   verifyEmail(req,res){
      let verify=async() =>{
        try{
          // console.log("XIN CHAO");
          var id=jwt.verify(req.body.token,process.env.SECRET).appointmentID
          // var id=jwt.verify(req.params.token,process.env.SECRET).appointmentID
          console.log(id);
          console.log(time());
          await accConnection.query(QUERY.UPDATE_APPOINTMENT_STATUS_PENDING,id)
          await accConnection.query(QUERY.UPDATE_APPOINTMENT_UPDATEAT,[time(),id])
          res.status(200).send('Verify Successfully')
        }
        catch{
          res.status(404).send('Verify Fail')
        }
      }
      verify()
   }
   getAllPending(req,res){
    let getPending=async() =>{
      try{
        var id_updateAt=(await accConnection.query(QUERY.SELECT_PENDING_APPOINTMENT))[0]
        console.log(id_updateAt);
        var id ='('
        for (let i=0;i<id_updateAt.length;i++)
        {
          id+=(id_updateAt[i].userID) + ','
        }
        id=id.substring(0,id.length-1)
        id += ')'
        var users_pending=(await accConnection.query(`SELECT id,name,email,phone FROM users WHERE id IN ${id}`))[0]
      
        for (let i=0;i<id_updateAt.length;i++)
        {
          for (let j=0;j<users_pending.length;j++)
          {
            if(id_updateAt[i].userID==users_pending[j].id)
            {
              id_updateAt[i].name=users_pending[j].name;
              id_updateAt[i].phone=users_pending[j].phone;
              id_updateAt[i].email=users_pending[j].email;
            } 
          }
        }
        res.status(200).json(id_updateAt)
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    getPending()
   }
   
   getAllApprove(req,res){
    let getApprove=async() =>{
      try{
        var id_updateAt=(await accConnection.query(QUERY.SELECT_APPROVE_APPOINTMENT))[0]
        console.log(id_updateAt);
        var id ='('
        for (let i=0;i<id_updateAt.length;i++)
        {
          id+=(id_updateAt[i].userID) + ','
        }
        id=id.substring(0,id.length-1)
        id += ')'
        var users_pending=(await accConnection.query(`SELECT id,name,email,phone FROM users WHERE id IN ${id}`))[0]
      
        for (let i=0;i<id_updateAt.length;i++)
        {
          for (let j=0;j<users_pending.length;j++)
          {
            if(id_updateAt[i].userID==users_pending[j].id)
            {
              id_updateAt[i].name=users_pending[j].name;
              id_updateAt[i].phone=users_pending[j].phone;
              id_updateAt[i].email=users_pending[j].email;
            } 
          }
        }
        res.status(200).json(id_updateAt)
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    getApprove()
   }

   getAllCancel(req,res){
    let getCancel=async() =>{
      try{
        var id_updateAt=(await accConnection.query(QUERY.SELECT_CANCEL_APPOINTMENT))[0]
        console.log(id_updateAt);
        var id ='('
        for (let i=0;i<id_updateAt.length;i++)
        {
          id+=(id_updateAt[i].userID) + ','
        }
        id=id.substring(0,id.length-1)
        id += ')'
        var users_pending=(await accConnection.query(`SELECT id,name,email,phone FROM users WHERE id IN ${id}`))[0]
      
        for (let i=0;i<id_updateAt.length;i++)
        {
          for (let j=0;j<users_pending.length;j++)
          {
            if(id_updateAt[i].userID==users_pending[j].id)
            {
              id_updateAt[i].name=users_pending[j].name;
              id_updateAt[i].phone=users_pending[j].phone;
              id_updateAt[i].email=users_pending[j].email;
            } 
          }
        }
        res.status(200).json(id_updateAt)
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    getCancel()
   }

   approveUser(req,res){
    let approve=async() =>{
      try{
        await accConnection.query(QUERY.UPDATE_APPROVE_APPOINTMENT,req.body.appointmentID)
        await accConnection.query(QUERY.UPDATE_APPOINTMENT_UPDATEAT,[time(),req.body.appointmentID])
        res.status(200).json("Update status approve sucessfully")
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    approve()
   }

   cancelUser(req,res){
    let cancel=async() =>{
      try{
        await accConnection.query(QUERY.UPDATE_CANCEL_APPOINTMENT,req.body.appointmentID)
        await accConnection.query(QUERY.UPDATE_APPOINTMENT_UPDATEAT,[time(),req.body.appointmentID])
        res.status(200).json("Update status cancel sucessfully")
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    cancel()
   }

   getApproveAppointment(req,res){
    let approveAppointment=async() =>{
      try{
        var result=(await accConnection.query(QUERY.SELECT_APPROVE_APPOINTMENT_FOR_DOC,req.query.employeeID))[0]
        var address=(await accConnection.query(QUERY.SELECT_EMPLOYEE_ADDRESS,req.query.employeeID))[0][0]
        for(var i=0;i<result.length;i++)
        {
          var users= (await accConnection.query(QUERY.SELECT_INFO_USERS_IN_APPOINTMENT,result[i].userID))[0][0]
          result[i].name=users.name
          result[i].phone=users.phone
          result[i].address=address.address
        } 
        res.status(200).json(result)
      }
      catch(err){
        res.status(404).send(err)
      }
    }
    approveAppointment()
   }
}

module.exports=new ScheduleController()