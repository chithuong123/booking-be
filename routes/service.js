const express = require('express');
const { getServices, getServicesByAgency, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

// Định tuyến cho việc lấy danh sách tất cả dịch vụ
router.get('/', getServices);

// Định tuyến cho việc lấy danh sách dịch vụ theo agencyId
router.get('/agency/:agency_id', getServicesByAgency);

// Định tuyến cho việc lấy chi tiết dịch vụ theo serviceId
router.get('/:serviceId', getServiceById);

// Định tuyến cho việc tạo dịch vụ mới
router.post('/', createService);

// Định tuyến cho việc cập nhật dịch vụ
router.put('/:id', updateService);

// Định tuyến cho việc xóa dịch vụ
router.delete('/:id', deleteService);

module.exports = router;