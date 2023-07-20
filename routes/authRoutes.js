const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/userlist', authController.getUserList);
router.put('/update/:username', authController.updateUser);

module.exports = router;
