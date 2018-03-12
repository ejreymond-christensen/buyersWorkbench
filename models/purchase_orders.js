
// To be filled with Sequelize to create purchase orders table

'use strict';

module.exports = function(sequelize, DataTypes) {
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
  });

  Purchase_orders.associate = function(models) {
    models.Parts.hasMany(models.Purchase_order_lines, {
      onDelete: "CASCADE"
    });
  };


  return Purchase_orders;
};

