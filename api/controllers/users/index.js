'use strict';

const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', userController.post);
router.get('/:id', userController.get);

module.exports = router;
