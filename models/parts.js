'use strict';

module.exports = function(sequelize, DataTypes) {
  var Parts = sequelize.define('Parts', {
  	pn: {
  		type: DataTypes.INTEGER, 
  		primaryKey: true, 
  		autoIncrement: true, 
  		defaultValue: 17920
  	},
    description: {
    	type: DataTypes.STRING, 
    	allowNull: false
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
    vendor_pn: {
    	type: DataTypes.STRING, 
    	allowNull: true
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
    }
  });

  return Parts;
};

