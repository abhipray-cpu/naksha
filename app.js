/*mocha will be used for running the test and chai will be used
for validating these tests

Sinon will be used for side effects/external dependencies  
*/
const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const csrf = require("csurf");
const logger = require("./logs/logger");
app.use(bodyParser.urlencoded({ extended: false }));
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //null is bascally the error and images is the name of teh folder where we want to store the files
  },
  filename: (req, file, cb) => {
    //this replace is requried only for windows since windows storage path does not allow :
    cb(
      null,
      Math.round(Math.floor(new Date() / 1000)) + "-" + file.originalname
    ); //file name is the hex encooding and original name is the original name of the file
  },
});
//this will filter only the requried files and will discard all other types of files

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } //will return the call back with a true value
  else {
    cb(null, false); //else will return false
  }
};
//make sure you are using this middlware before you are using the static images middleware
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "views");
const flash = require("connect-flash");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const Store = new mongoSession({
  uri: MONGO_URI,
  collection: "session",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET, //this secret should be a strong and lenthy string
    resave: false,
    saveUninitialized: false,
    store: Store,
  })
);
const csrfProtection = csrf();
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
  //now for every req rendered these two field will be included
});
app.use(flash());
const generalRoutes = require("./routes/general_routes");
const userRoutes = require("./routes/user_routes");
const sportRoutes = require("./routes/sports");
app.use(generalRoutes);
app.use(userRoutes);
app.use(sportRoutes);
app.use((error, req, res, next) => {
  logger.error(`500 || ${error}`);
  res.render("500.ejs");
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((user) => {
    console.log("Connected successfully!!");
    logger.log({
      level: "info",
      message: "Connected sucessfully!!",
    });
    app.listen(8081);
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: `The server crashed due to: ${err}`,
    });
  });
