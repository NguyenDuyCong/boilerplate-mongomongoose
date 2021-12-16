const mongoose = require("mongoose");
const mongodb = require("mongodb");
require("dotenv").config();

let Person;

/**
 * CODE
 * Author: NDC
 */

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});
const Schema = mongoose.Schema;

// defining personSchema schema
const personSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String]
});

//create Person model
Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "NDC",
    age: 23,
    favoriteFoods: ["meat", "banana", "cookie"]
  });

  person.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find person by id
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    // add "humburger" to favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // save
    person.save((err, updatePerson) => {
      if (err) return console.error(err);
      done(null, updatePerson);
    });
  });
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // findOneAndUpdate(conditions, update, options, callback)
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    }
  );
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */
//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
