const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const peopleRoutes = require("./routes/people");
const projectsRoutes = require("./routes/projects");

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/loc-Eight', {useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database.');
  })
    .catch(() => {
      console.log('Connection failed!');
    });


app.use(bodyParser.json());
//Allowing any requests with /images to coninue.
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Headers",
 "Origin, X-Requested-With, Content-Type, Accept"
 );
 res.setHeader("Access-Control-Allow-Methods",
 "GET, POST, PATCH, PUT, DELETE, OPTIONS"
 );
  next();
})

app.use("/api/people", peopleRoutes);

app.use("/api/projects", projectsRoutes);



module.exports = app;

