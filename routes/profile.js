const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyToken = require('../middleware/authMiddleware'); 
const getCurrentUser = require('../middleware/authMiddleware'); 

router.get('/', verifyToken, getCurrentUser, profileController.getProfile);

router.put('/', verifyToken, getCurrentUser, profileController.updateProfile);

router.put('/password', verifyToken, getCurrentUser, profileController.updatePassword);

module.exports = router;