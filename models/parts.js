'use strict';
var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Parts = sequelize.define('Parts', {
  	pn: {
  		type: Sequelize.INTEGER, 
  		primaryKey: true, 
  		autoIncrement: true, 
  		defaultValue: 17920
  	},
    description: {
    	type: Sequelize.STRING, 
    	allowNull: false
    },
    uom: {
    	type: Sequelize.STRING, 
    	allowNull: false
    },
    buyer: {
    	type: Sequelize.INTEGER, 
    	allowNull: false
    },
    vendor: {
    	type: Sequelize.STRING, 
    	allowNull: true
    },
    vendor_pn: {
    	type: Sequelize.STRING, 
    	allowNull: true
    },
    lt_days: {
    	type: Sequelize.INTEGER, 
    	allowNull: false
    },
    cost: {
    	type: Sequelize.DECIMAL(10,2), 
    	allowNull: false
    },
    sales_price: {
    	type: Sequelize.DECIMAL(10,2), 
    	allowNull:false
    },
    ord_qty: {
    	type: Sequelize.INTEGER, 
    	allowNull: true, defaultValue: 1
    },
    qoh: {
    	type: Sequelize.INTEGER, 
    	allowNull: true, 
    	defaultValue: 0
    },
    ss: {
    	type: Sequelize.INTEGER, 
    	allowNull: true, 
    	defaultValue: 0
    },
    committed: {
    	type: Sequelize.INTEGER, 
    	allowNull: true
    },
    active: {
    	type: Sequelize.BOOLEAN, 
    	allowNull: false, 
    	defaultValue: 0
    }
  }, {
    timestamps: false
  });

  return Parts;
};

