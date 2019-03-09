'use strict';

const express = require('express');
const Queue = require('../queue')
const { dogData } = require('../data');
const router = express.Router();

const dogs = new Queue()

for (let dog of dogData) {
  dogs.enqueue(dog)
}


router.get('/', (req, res, next) => {
  return res.json(dogs.peek());
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

  dogs.enqueue(dogObject)
});

router.delete('/', (req, res, next) => {
  dogs.dequeue();
  return res.sendStatus(204)
  .catch(err => {
    next(err.message);
  })
})

module.exports = router;