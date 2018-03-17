'use strict';

module.exports = function(sequelize, DataTypes) {
  console.log("Hi");
  var Purchase_orders = sequelize.define('Purchase_orders', {
    po_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Purchase_orders;
};
