'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { dogData } = require('../data');
const Dog = require('../models/dogs');
const router = express.Router();


router.get('/', (req, res, next) => {
  Dog.find()
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      console.log(err.message);
      next(err);
    });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const {imageURL, imageDescription, name, sex,  age, breed, story} = req.body;

  const dogObject = {
    imageURL,
    imageDescription,
    name,
    sex,
    age,
    breed,
    story
  };

  Dog.create(dogObject)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    });
});

router.delete('/', (req, res, next) => {
  Dog.find()
  .then(results => {
    return results[0]
  })
  .then(dog => {
    console.log("ID IS: *******", dog.id)
    console.log("_ID IS: *******", dog._id)
    console.log("__ID IS: *******", dog.__id)
    return Dog.findOneAndDelete({id: dog._id})
  })
  .then( ()=> {
    res.sendStatus(204);
  })
  .catch(err => {
    next(err);
  })
})

module.exports = router;