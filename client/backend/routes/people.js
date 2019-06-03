const express = require("express");

const Person = require('../models/person');

const router = express.Router();


router.post("", (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    role: req.body.role
  });
  person.save().then(addedPerson => {
    res.status(201).json({
      message: 'Person Added',
      personId: addedPerson._id
   });
  });
});

router.put("/:id", (req, res, next) => {
  const person = new Person({
    _id: req.body.id,
    name: req.body.name,
    role: req.body.role
 });
  Person.updateOne({ _id: req.params.id}, person).then(result => {
    res.status(200).json({message: 'Person Updated!'});
  });
});


router.get("", (req, res, next) => {
  Person.find().then(documents => {
   res.status(200).json({
    message: 'People fetched successfully',
    people: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({message: 'Person not found!'});
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Person.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Person removed." });
    });
  });

  module.exports = router;
