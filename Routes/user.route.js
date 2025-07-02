const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const { verifyToken } = require('../middleware/auth');


router.post('/users', verifyToken, userController.createUser);
router.get('/users', verifyToken, userController.getAllUsers);
router.get('/users/:id', verifyToken, userController.getUserById);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

module.exports = router;