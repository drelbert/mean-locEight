const express = require("express");

const PeopleController = require ("../controllers/people");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post(
  "",
  checkAuth,
  PeopleController.addPerson
 );


router.put(
  "/:id",
  checkAuth,
  PeopleController.updatePerson
  );


router.get("", PeopleController.getPeople);


router.get("/:id", PeopleController.getPersonById);

router.delete(
  "/:id",
  checkAuth,
  PeopleController.deletePerson
  );

module.exports = router;
