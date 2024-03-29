'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const catsRouter = require('./routes/cats');
const dogsRouter = require('./routes/dogs');
const {catData, dogData} = require('./data')
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');



const app = express();
app.use(express.json());
app.use(
  cors()
);
app.use('/api/cats', catsRouter);
app.use('/api/dogs', dogsRouter);


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);



function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
