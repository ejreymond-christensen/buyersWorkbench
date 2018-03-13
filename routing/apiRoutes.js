var express = require("express");
var router = express.Router();

var db = require("../models/");

function addPoAndPoLine(request, i) {

		db.Purchase_orders.create({

			vendor: request.vendor

		}).then(function(results) {

			db.Purchase_order_lines.create({

				po_number: results.po_num,
				po_ln: i,
				pn: request.pn,
				order_qty: request.qty,
				delivered_qty: 0,
				due_date: request.date,
				open: true

			}).then(function() {
				
				console.log("Created PO line");

			});

		});

}

module.exports = function(app) {

	app.post("/api/purchase", function(req, res) {

		for (var i = 0; i < req.body.length; i++) {

			var request = req.body[i];

			addPoAndPoLine(request, i);

		}

		res.send("Complete");

	});

	app.get("/api/part/:pn", function(req, res) {

		if (req.params.pn) {

			db.Parts.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results) {

				res.json(results);

			});

		}

	});

	// Getting part-specific PO information
	app.get("/api/partPOLine/:pn", function(req, res) {

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
	app.get("/api/sales/:pn", function(req, res) {
		
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

	app.get("/api/vendor/:id", function(req, res) {

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

};