const router = require("express").Router();
const Person = require("../models/Person");

//Create a person
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ message: "You must provide a name!" });
    return;
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

//List people
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Get person by ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const person = await Person.findOne({ _id: userId });
    //const person = await Person.findById(userId); --> work too!

    if (!person) {
      res.status(422).json({ message: "User not found..." });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update person
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "User not updated..." });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete person
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  const person = await Person.findOne({ _id: userId });

  if (!person) {
    res.status(422).json({ message: "User not found..." });
    return;
  }

  try {
    await Person.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
