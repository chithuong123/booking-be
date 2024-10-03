const { Agency } = require('../models');

// Lấy danh sách các đại lý
const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll();
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Tạo đại lý mới
const createAgency = async (req, res) => {
  const { userId, name, description, address, phoneNumber } = req.body;
  try {
    const newAgency = await Agency.create({
      userId,
      name,
      description,
      address,
      phoneNumber
    });
    res.status(201).json(newAgency);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAgencies, createAgency };