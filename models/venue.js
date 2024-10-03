'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venue.init({
    agencyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Venue',
    tableName: 'venues',  // Đặt tên bảng theo quy tắc snake
  });
  return Venue;
};