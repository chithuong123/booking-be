const { Service } = require('../models');

// Lấy danh sách tất cả các dịch vụ
const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getServicesByAgency = async (req, res) => {
  const { agency_id } = req.params;
  try {
    const services = await Service.findAll({ where: { agencyId: agency_id } });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getServiceById = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Tạo dịch vụ mới
const createService = async (req, res) => {
  const { name, description, price, agency_id } = req.body;
  try {
    const newService = await Service.create({
      name,
      description,
      price,
      agencyId: agency_id
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Cập nhật dịch vụ
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, agency_id } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    service.name = name;
    service.description = description;
    service.price = price;
    service.agencyId = agency_id;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Xóa dịch vụ
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getServices, getServicesByAgency, getServiceById, createService, updateService, deleteService };