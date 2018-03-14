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
    pn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });

  Purchase_order_lines.associate = function (models) {
    models.Purchase_order_lines.belongsTo(models.Purchase_orders, {
      foreignKey: "po_num"
    });
  };

  return Purchase_order_lines;
};
