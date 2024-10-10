const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const secretKey = 'your_secret_key';

// controllers/authController.js
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).send({ message: 'Validation error', errors });
    } else {
      console.error('Error registering user:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }

    // Tạo JWT
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    res.status(200).send({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};