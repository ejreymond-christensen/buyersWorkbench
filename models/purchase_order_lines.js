'use strict';
module.exports = function(sequelize, DataTypes) {
  var Purchase_order_lines = sequelize.define('Purchase_order_lines', {
    po_number: {
      type: Sequelize.INTEGER, 
      allowNull: false
    },
    po_ln: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pn: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    order_qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    delivered_qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    open: {
      type: Sequelize.BOOLEAN, 
      allowNull: false,
      defaultValue: 0
    }
  });

  Purchase_order_lines.associate = function (models) {
    models.Purchase_order_lines.belongsTo(models.Purchase_orders, {
      foreignKey: "po_num"
    });
  };

  return Purchase_order_lines;
};
