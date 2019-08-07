const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Route importing here
const peopleRoutes = require("./routes/people");
const projectsRoutes = require("./routes/projects");
const userRoutes = require("./routes/user");

const app = express();



//'mongodb+srv://locEightAdmin:<password>@cluster0-80zc4.mongodb.net/test?retryWrites=true&w=majority'

//Local  "mongodb://127.0.0.1:27017/loc-Eight"

//Atlas  "mongodb+srv://locEightAdmin:" + process.env.MONGO_ATLAS_PW + "@cluster0-80zc4.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect("mongodb+srv://locEightAdmin:" + process.env.MONGO_ATLAS_PW + "@cluster0-80zc4.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database.');
  })
    .catch(() => {
      console.log('Connection failed!');
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Allowing any requests with /images to coninue.
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "integrated")));

app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
 );
 res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
 );
  next();
})

// Forwarding requests aiming at /api/..
app.use("/api/people", peopleRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "integrated", "index.html"));
});




module.exports = app;

