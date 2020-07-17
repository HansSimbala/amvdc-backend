'use strict';

const express = require('express');
const locationController = require('./location.controller');

const router = express.Router();

router.post('/', locationController.post);

module.exports = router;
