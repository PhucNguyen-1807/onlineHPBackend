const express = require("express");
const app = express();
const route = require("./src/routes/index.js");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const { engine } = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();

app.use(cors({
  origin: "*",
  credentials: true,
  exposeHeaders :["set-cookie"]
}));


// Define your routes
app.get('/login', (req, res) => {
  // Handle login request
  res.send('Login successful!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(cookieParser({
sameSite: 'none'
}));

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});

app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// db.connect();
route(app);

app.listen("3001", () => {
  console.log("fuck y2ou");
});
