'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
    }
  }

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    agencyId: {
      type: DataTypes.INTEGER,
      field: 'agency_id'
    },
    serviceId: {
      type: DataTypes.INTEGER,
      field: 'service_id'
    },
    venueId: {
      type: DataTypes.INTEGER,
      field: 'venue_id'
    },
    bookingDate: {
      type: DataTypes.DATE,
      field: 'booking_date'
    },
    eventDate: {
      type: DataTypes.DATE,
      field: 'event_date'
    },
    status: {
      type: DataTypes.STRING,
      field: 'status'
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      field: 'total_price'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    timestamps: true
  });

  return Booking;
};