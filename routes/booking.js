const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, bookingController.createBooking); // Sửa lại route để khớp với đăng ký trong server.js
router.get('/user', verifyToken, bookingController.getUserBookings); // Route để lấy danh sách booking của người dùng hiện tại

module.exports = router;