// To be filled with Sequelize to create purchase order lines table
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Purchase_order_lines = sequelize.define('Purchase_order_lines', {
    po_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    po_ln: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    po_vendor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
      min: 1,
      isInt: true
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate:{
      isAfter: "2017-06-06"
      }
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });

  return Purchase_order_lines;
};
