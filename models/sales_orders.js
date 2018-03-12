'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Sales_orders = sequelize.define('Sales_orders', {
    so_num: {
      type: Sequelize.INTEGER, 
      allowNull: true
    },
    so_ln: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    pn: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    customer: {
      type: Sequelize.STRING, 
      allowNull: true
    },
    order_qty: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    delivered_qty: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    open: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });


  return Sales_orders;
};

