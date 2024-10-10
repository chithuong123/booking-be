const jwt = require('jsonwebtoken');
const { Booking, User, Service } = require('../models'); // Import mô hình Service
const secretKey = 'your_secret_key'; // Đảm bảo rằng bạn đã định nghĩa secretKey

exports.createBooking = async (req, res) => {
  const { email } = req.body; // Extract email from request body

  try {
    // Truy vấn để lấy user_id từ email
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const userId = user.id; // Lấy user_id từ đối tượng User
    const bookingDate = req.body.booking_date;
    const totalPrice = req.body.price;
    const serviceId = req.body.serviceId;

    // Tạo booking mới
    const newBooking = await Booking.create({
      userId,
      bookingDate,
      totalPrice,
      serviceId
    });
    res.status(200).send({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.getUserBookings = async (req, res) => {
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

    const userId = user.id;
    const bookings = await Booking.findAll({ where: { userId } });

    // Lấy danh sách serviceId từ các booking
    const serviceIds = bookings.map(booking => booking.serviceId);

    // Truy vấn để lấy thông tin chi tiết của các dịch vụ
    const services = await Service.findAll({
      where: { id: serviceIds },
      attributes: ['id', 'name', 'description']
    });

    // Tạo một đối tượng để ánh xạ serviceId với thông tin dịch vụ
    const serviceMap = services.reduce((map, service) => {
      map[service.id] = service;
      return map;
    }, {});

    // Kết hợp thông tin dịch vụ vào các booking
    const bookingsWithServiceDetails = bookings.map(booking => {
      return {
        ...booking.toJSON(),
        service: serviceMap[booking.serviceId]
      };
    });

    res.status(200).send(bookingsWithServiceDetails);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};