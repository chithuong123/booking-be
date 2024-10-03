const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const agencyRoutes = require('./routes/agency');
const serviceRoutes = require('./routes/service');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const profileRoutes = require('./routes/profile');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/agencies', agencyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Wedding Booking API!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});