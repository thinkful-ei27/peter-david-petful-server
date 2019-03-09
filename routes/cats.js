'use strict';

const express = require('express');
const {Queue, peek, display } = require('../queue')
const { catData } = require('../data');
const router = express.Router();
const cats = new Queue()

for (let cat of catData) {
  cats.enqueue(cat)
}


router.get('/', (req, res, next) => {
  display(cats)
  return res.json(peek(cats));
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

  cats.enqueue(dogObject)
});

router.delete('/', (req, res, next) => {
  cats.dequeue();
  return res.sendStatus(204)
})

module.exports = router;