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

	app.get("/api/poLines/:pn", function(req, res) {

		if (req.params.pn) {

			db.Purchase_order_lines.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results) {

				res.json(results);

			});

		}

	});

	app.get("/api/salesOrders/:pn", function(req, res) {
		
		if (req.params.pn) {

			db.Sales_orders.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results) {

				res.json(results);

			});

		}

		else {

			SalesOrders.findAll({}).then(function(results) {

				res.json(results);

			});

		}

	});

	// app.get("/api/vendor/:id", function(req, res) {

	// 	// If an id is specified
	// 	if (req.params.id) {

	// 		// Find the relevant vendor info
	// 		Vendors.findAll({

	// 			where: {

	// 				pn: req.params.id

	// 			}

	// 		}).then(function(results) {

	// 			// Send back results
	// 			res.json(results);

	// 		});

	// 	}

	// });

	app.get('/api/parts', (req, res) => {  
	    db.Parts.findAll({
	      include: [
	        {
	          model: db.Purchase_order_lines,
	        }
	      ]
	    }).then(Parts => {
	      const resObj = Parts.map(user => {

	        return Object.assign(
	          {},
	          {
	            pn: user.pn,
	            description: user.description,
	            buyer: user.buyer,
	            Purchase_order_lines: user.Purchase_order_lines.map(post => {

	              return Object.assign(
	                {},
	                {
	                  po_number: post.po_number,
	                  po_ln: post.po_ln,
	                  order_quantity: post.order_quantity,
	                }
	                )
	            })
	          }
	        )
	      });
	      res.json(resObj)
	    });
	});	

};