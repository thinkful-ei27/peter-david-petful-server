'use strict';

const express = require('express');
const mongoose = require('mongoose');
const catData = require('./data');
const Pet = require('./model')
const router = express.Router();


router.get('/', (req, res, next) => {
  Pet.find()
  .then(results => {
    res.json(results)
  })
  .catch(err => {
    console.log(err.message)
    next(err);
  })
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  const {imageURL, imageDescription, name, sex,  age, breed, story} = req.body

  const petObject = {
  imageURL,
  imageDescription,
  name,
  sex,
  age,
  breed,
  story
  }

  Pet.create(petObject)
  .then(result => {
    res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
  })
})

module.exports = router;