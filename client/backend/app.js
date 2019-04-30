const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Headers",
 "Origin, X-Requested-With, Content-Type, Accept"
 );
 res.setHeader("Access-Control-Allow-Methods",
 "GET, POST, PATCH, DELETE, OPTIONS"
 );
  next();
})

app.post("/api/people", (req, res, next) => {
  const people = req.body;
  console.log(people);
  res.status(201).json({
    message: 'Post Added'
  });
});

app.use("/api/people", (req, res, next) => {
  const people = [
    {
      id: "LAX805",
      name: "First name posted",
      role: "Server delivered"
    },
    {
      id: "SBA969",
      name: "Another name posted",
      role: "Server delivered"
    }
  ];
  res.status(200).json({
    message: 'People fetched successfully',
    people: people
  });
});

module.exports = app;

