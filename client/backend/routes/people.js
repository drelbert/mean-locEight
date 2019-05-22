const express = require("express");

const People = require('../models/people');

const router = express.Router();


router.post("", (req, res, next) => {
  const people = new People({
    //Passing in the JavaScript object from models/people
    name: req.body.name,
    role: req.body.role
  });
  people.save().then(addedPerson => {
    res.status(201).json({
      message: 'Person Added',
      personId: addedPerson._id
   });
  });
});


router.put("/:id", (req, res, next) => {
  const person = new People({
    _id: req.body.id,
    name: req.body.name,
    role: req.body.role
  })
  People.updateOne({_id: req.params.id}, person).then(result => {
    res.status(200).json({ message: "Person Updated!" });
  });
});


router.get("", (req, res, next) => {
   People.find().then(documents => {
    res.status(200).json({
      message: 'People fetched successfully',
      people: documents
   });
  });
});

router.get("/:id", (req, res, next) => {
  People.findById(req.params.id).then(person => {
    if(person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({message: "Person Not Found"});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  People.deleteOne({_id: req.params.id}).then (result => {
    console.log(result);
    res.status(200).json({message: 'Person removed'});
  });
});

module.exports = router;
