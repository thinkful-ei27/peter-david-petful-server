'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { catData } = require('../data');
const Cat = require('../models/cats');
const router = express.Router();

const cats = new Queue()

for (cat of catData) {
  cats.enqueue(cat)
}


router.get('/', (req, res, next) => {
  Cat.find()
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

  const catObject = {
    imageURL,
    imageDescription,
    name,
    sex,
    age,
    breed,
    story
  }

  Cat.create(catObject)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    });
});

router.delete('/', (req, res, next) => {
  Cat.find()
  .then(results => {
    return results[0]
  })
  .then(cat => {
    if (!cat) {
      return res.json("Out of Cats")
    }
    return Cat.findOneAndDelete({id: cat._id})
  })
  .then(()=> {
    res.sendStatus(204);
  })
  .catch(err => {
    next(err)
  })
})

module.exports = router;