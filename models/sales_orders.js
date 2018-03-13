// To be filled with Sequelize to create sales orders table
var Sequelize =require("sequelize");

'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Sales_orders = sequelize.define('Sales_orders', {
    so_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    so_ln: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pn: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    delivered_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });


  return Sales_orders;
};