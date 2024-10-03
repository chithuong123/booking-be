'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Agency, { foreignKey: 'agency_id' });
    }
  }

  Service.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'description'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'price'
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'agency_id',
      references: {
        model: 'agencies',
        key: 'id'
      }
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      field: 'images'
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
    modelName: 'Service',
    tableName: 'services',
    timestamps: true
  });

  return Service;
};