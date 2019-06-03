const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const peopleRoutes = require("./routes/people");

const app = express();

mongoose.connect("mongodb+srv://locEightAdmin:gAp8MCPMfu7OBUs3@cluster0-80zc4.mongodb.net/loc-Eight?retryWrites=true")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection Failed');
  });
// Here is a set of middlewares, basically a funnel.
app.use(bodyParser.json());
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

app.use("/api/projects", (req, res, next) => {
  const projects = [
    {
    id: "ghgh58eajfg",
    title: "Do This",
    lead: "Tor",
    dateDue: "August"
    },
    {
      id: "htehjetyekh",
      title: "And This",
      lead: "Magnus",
      dateDue: "November"
      }
  ];
  res.status(200).json[{
    message: 'Projects in db',
    projects: projects
  }];
});

module.exports = app;

