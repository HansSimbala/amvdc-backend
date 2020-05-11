'use strict';

const express = require('express');
const authenticationController = require('./authentication.controller');
const router = express.Router();

router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.logout);
router.post('/reset-password', authenticationController.resetPassword);

module.exports = router;
