'use strict';

module.exports = function(sequelize, DataTypes) {
  var Parts = sequelize.define('Parts', {
  	pn: {
  		type: DataTypes.INTEGER,
  		primaryKey: true,
  		autoIncrement: true
  	},
    description: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    rev: {
    	type: DataTypes.STRING,
    	allowNull: false,
      defaultValue: "A"
    },
    uom: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    buyer: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    vendor: {
    	type: DataTypes.STRING,
    	allowNull: true
    },
    vendor_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendor_pn: {
    	type: DataTypes.STRING,
    	allowNull: true
    },
    type: {
    	type: DataTypes.STRING,
    	allowNull: true,
      defaultValue: "P"
    },
    lt_days: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    cost: {
    	type: DataTypes.DECIMAL(10,2),
    	allowNull: false
    },
    sales_price: {
    	type: DataTypes.DECIMAL(10,2),
    	allowNull:false
    },
    ord_qty: {
    	type: DataTypes.INTEGER,
    	allowNull: true, defaultValue: 1
    },
    qoh: {
    	type: DataTypes.INTEGER,
    	allowNull: true,
    	defaultValue: 0
    },
    ss: {
    	type: DataTypes.INTEGER,
    	allowNull: true,
    	defaultValue: 0
    },
    committed: {
    	type: DataTypes.INTEGER,
    	allowNull: true
    },
    active: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false,
    	defaultValue: 0
    },
    Thrity_past: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sixty_past: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ninety_past: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_f: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false
  });


  return Parts;
};
