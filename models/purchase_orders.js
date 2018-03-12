'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Purchase_orders = sequelize.define('Purchase_orders', {
    po_num: {
      type: Sequelize.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    },
    vendor: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Purchase_orders.associate = function(models) {
    models.Parts.hasMany(models.Purchase_order_lines, {
      onDelete: "CASCADE"
    });
  };


  return Purchase_orders;
};

