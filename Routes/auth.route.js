const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');


router.get('/login', authController.login);

module.exports = router;