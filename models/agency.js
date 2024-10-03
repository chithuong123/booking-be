'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Agency extends Model {
    static associate(models) {
      Agency.hasMany(models.Service, { foreignKey: 'agencyId' });
    }
  }

  Agency.init({
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    administratorId: {
      type: DataTypes.INTEGER,
      field: 'administrator_id'
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    address: {
      type: DataTypes.STRING,
      field: 'address'
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image'
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
    modelName: 'Agency',
    tableName: 'agencies',
    timestamps: true
  });

  return Agency;
};