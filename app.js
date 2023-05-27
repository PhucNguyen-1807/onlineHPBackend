const express=require('express');
const app=express();
const route= require('./src/routes/index.js')
const bodyParser=require('body-parser')
const multer = require("multer");
const upload = multer()
const {engine}=require('express-handlebars');
const path=require('path')
const cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())
app.use(cookieParser());
app.engine('hbs', engine({
  extname:".hbs",
  helpers: {
      sum(a,b) {return a+b}
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src/resource','views'));
process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----')
  console.log(error)
  console.log('----- Exception origin -----')
  console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----')
  console.log(promise)
  console.log('----- Reason -----')
  console.log(reason)
})

app.use(upload.array())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// db.connect();
route(app)

app.listen('3000',()=>{
  console.log('fuck y2ou');
})