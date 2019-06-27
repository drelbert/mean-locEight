const express = require("express");

const People = require('../models/people');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.post("",
checkAuth,
 (req, res, next) => {
  const people = new People({
    //Passing in the JavaScript object from models/people
    name: req.body.name,
    role: req.body.role
  });
  people
  .save()
  .then(addedPerson => {
    res.status(201).json({
      message: 'Person Added',
      personId: addedPerson._id
   });
  });
});


router.put("/:id",
  checkAuth,
  (req, res, next) => {
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
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const peopleQuery = People.find();
  let fetchedPeople;
  if (pageSize && currentPage) {
    peopleQuery
      .skip(pageSize * (currentPage -1))
      .limit(pageSize);
  }
   peopleQuery
   .then(documents => {
     fetchedPeople = documents;
    return People.count();
   })
    .then(count => {
      res.status(200).json({
        message: 'People fetched successfully',
        people: fetchedPeople,
        maxPeople: count
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

router.delete("/:id",
  checkAuth,
  (req, res, next) => {
  People.deleteOne({_id: req.params.id}).then (result => {
    console.log(result);
    res.status(200).json({message: 'Person removed'});
  });
});

module.exports = router;
