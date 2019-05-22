const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const peopleRoutes = require("./routes/people");
const Project = require("./models/project");

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/loc-Eight', {useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database.');
  })
    .catch(() => {
      console.log('Connection failed!');
    });


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



// Work on the Projects functionality
app.post("/api/projects", (req, res, next) => {
  const project = new Project({
    title: req.body.title,
    lead: req.body.lead,
    dateDue: req.body.dateDue
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project Added!',
      projectId: createdProject._id
   });
  });
});

app.put("/api/projects/:id", (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    lead: req.body.lead,
    dateDue: req.body.dateDue
  });
  Project.updateOne({ _id: req.params.id }, project).then(result => {
    res.status(200).json({ message: "Update Success!" });
  });
});

app.get("/api/projects", (req, res, next) => {
  Project.find().then(documents => {
   res.status(200).json({
    message: "Projects returned",
    projects: documents
  });
 });
});

app.get("/api/projects/:id", (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if(project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({message: "Project Not Found"})
    }
  });
});

app.delete("/api/projects/:id", (req, res, next) => {
    Project.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Project Removed.' });
  });
});

module.exports = app;

