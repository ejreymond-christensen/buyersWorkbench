'use strict';
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
  });

  Purchase_orders.associate = function(models) {
    models.Parts.hasMany(models.purchase_order_lines, {
      onDelete: "CASCADE"
    });
  };


  return Purchase_orders;
};
