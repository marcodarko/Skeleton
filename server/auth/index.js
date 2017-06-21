'use strict';
const express = require('express');
const config = require('../config/environment');
const User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

const router = express.Router();

router.use('/local/', require('./local'));
router.use('/local/agent', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/facebook/agent', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/twitter/agent', require('./twitter'));
router.use('/google', require('./google'));
router.use('/google/agent', require('./google'));

module.exports = router;
