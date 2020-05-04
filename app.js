'use strict';

const logger = require('morgan');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileParser = require('express-multipart-file-parser');

global.XMLHttpRequest = require('xhr2');

app.use(cors());
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(async(request, response, next) => {
  try {
    next();
  } catch (error) {
    response
      .status(500)
      .json({status: '500', message: 'Error while verifying token', data: {}});
  }
});

app.use(bodyParser.json({limit: '100mb'})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '100mb',
  extended: true
}));

app.use(
  logger(
    ':date[iso] - :remote-addr ":method :url HTTP/:http-version" status::status :res[' +
    'content-length] bytes - :response-time \bms'
  )
);

app.use(fileParser);
app.use('/api/', require('./api/controllers'));

module.exports = app;
