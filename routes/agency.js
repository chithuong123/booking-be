// routes/agency.js
const express = require('express');
const { getAgencies, createAgency } = require('../controllers/agencyController');
const router = express.Router();

// Định tuyến cho việc lấy danh sách đại lý
router.get('/', getAgencies); // Sử dụng dấu '/' thay vì '/agencies' để phù hợp với cách bạn đã định tuyến

// Định tuyến cho việc tạo đại lý mới
router.post('/', createAgency); // Tương tự, sử dụng dấu '/'

// Xuất router
module.exports = router;
