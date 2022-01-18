const router = require("express").Router();
const Person = require("../models/Person");

//Create a person
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ message: "You must provide a name!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);

    res.status(201).json({ message: "Person created successfuly!" });
  } catch (error) {
    res.status(500).json({ error: error }); //this is not the best practice!!! it's just demonstrative
  }
});

module.exports = router;
