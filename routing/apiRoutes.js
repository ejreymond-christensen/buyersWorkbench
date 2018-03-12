var express = require("express");
var router = express.Router();

var PurchaseOrder = require("../models/purchase_orders.js");
var PurchaseOrderLines = require("../models/purchase_order_lines.js");
var SalesOrders = require("../models/sales_orders.js");
var Parts = require("../models/parts.js");
var Vendors = require("../models/Vendors.js");

// Making a purchase
router.post("/api/purchase", function(req, res) {

	// Make sure the request has gone through
	console.log("Trying to make a purchase");

	// Verify the content of the request
	console.log(req.body);


	// Interactions with database tables (Sequelize)

	// Create PO  - PO number generated automatically by Sequelize
	PurchaseOrder.create({

		vendor: req.vendor

	}).then(function(results) {

		// Create PO line
		PurchaseOrderLines.create({

			po_num: results.po_num,
			po_ln: req.po_ln,
			pn: req.part,
			order_qty: req.qty,
			delivered_qty: 0,
			due_date: req.date,
			open: true

		});

	});

});

// Getting part information
router.get("/api/part/:pn", function(req, res) {

	// If a part has been specified
	if (req.params.pn) {

		// Find the relevant part
		Parts.findAll({

			where: {

				pn: req.params.pn

			}

		}).then(function(results) {

			// Send back results
			res.json(results);

		});

	}

});

// Getting part-specific PO information
router.get("/api/partPOLine/:pn", function(req, res) {

	// If part from PO line specified
	if (req.params.pn) {

		// Find the relevant PO line
		PurchaseOrderLines.findAll({

			where: {

				pn: req.params.pn

			}

		}).then(function(results) {

			// Send back results
			res.json(results);

		});

	}

});

// Getting sales order information
router.get("/api/sales/:pn", function(req, res) {
	
	// If part specified
	if (req.params.pn) {

		//Find the relevant sales order(s)
		SalesOrders.findAll({

			where: {

				pn: req.params.pn

			}

		}).then(function(results) {

			// Send back results
			res.json(results);

		});

	}

	else {

		// Take all sales orders
		SalesOrders.findAll({}).then(function(results) {

			// Send back results 
			res.json(results);

		});

	}

});

router.get("/api/vendor/:id", function(req, res) {

	// If an id is specified
	if (req.params.id) {

		// Find the relevant vendor info
		Vendors.findAll({

			where: {

				pn: req.params.id

			}

		}).then(function(results) {

			// Send back results
			res.json(results);

		});

	}

});



