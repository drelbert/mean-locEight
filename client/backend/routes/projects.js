const express = require("express");
const multer = require("multer");

const Project = require('../models/projects');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

//Configuiring multer to define where multer puts files when it detects incoming req
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.post(
  "",
  checkAuth,  //TODO, add to other routes below
  multer({storage: storage}).single("image"),
  (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const project = new Project({
    title: req.body.title,
    lead: req.body.lead,
    dueOn: req.body.dueOn,
    imagePath: url + "/images/" + req.file.filename
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: 'Project Added!',
      project: {
        ...createdProject,
        id: createdProject._id
      }
   });
  });
 }
);

router.put(
  "/:id",
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    lead: req.body.lead,
    dueOn: req.body.dueOn,
    imagePath: imagePath
  });
  Project
  .updateOne(
    { _id: req.params.id },
    project
    ).then(result => {
    res.status(200).json({ message: "Update Success!" });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Project.find();
  let fetchedProjects;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
  postQuery
  .then(documents => {
    fetchedProjects = documents;
    return Project.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Projects fetched successfully",
      projects: fetchedProjects,
      maxProjects: count
    });
  });
});

router.get("/:id", (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if(project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({message: "Project Not Found"})
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Project.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Project Removed.' });
  });
});

module.exports = router;
