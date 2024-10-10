const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Đảm bảo import đúng mô hình User
const secretKey = 'your_secret_key'; // Đảm bảo rằng bạn đã định nghĩa secretKey

exports.getProfile = async (req, res) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
    }

    token = token.replace('Bearer ', '');

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: ['id', 'username', 'email']
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Cập nhật thông tin hồ sơ người dùng
exports.updateProfile = async (req, res) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
    }

    token = token.replace('Bearer ', '');

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: ['id', 'username', 'email']
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.status(200).send({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Cập nhật mật khẩu người dùng
exports.updatePassword = async (req, res) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
    }

    token = token.replace('Bearer ', '');

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: ['id', 'username', 'email', 'password']
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { oldPassword, newPassword } = req.body;

    // Kiểm tra mật khẩu cũ
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid old password' });
    }

    // Mã hóa mật khẩu mới và cập nhật
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};