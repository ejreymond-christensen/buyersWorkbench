var express = require("express");
var router = express.Router();

var db = require("../models/");

function addPoAndPoLine(request, i) {
	console.log("req func"+request);
		db.Purchase_orders.create({

			vendor: request.vendor

		}).then(function(results) {

			db.Purchase_order_lines.create({

				po_number: results.po_num,
				po_ln: i,
				pn: request.pn,
				po_vendor: results.vendor,
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
		console.log(req.body);
		addPoAndPoLine(req.body, 1);

		// for (var i = 0; i < req.body.length; i++) {
    //
		// 	var request = req.body.json[i];
    //
		// 	addPoAndPoLine(request, i);
		// }

		res.send("Complete");

	});

	app.get("/api/part/:pn?", function(req, res) {

		if (req.params.pn) {

			db.Parts.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results, error) {

				if (error) {

					res.status(500);
					res.send('error');

				}

				else {

					res.json(results);

				}

			});

		}else {

			db.Parts.findAll({}).then(function(results) {

				res.json(results);

			});

		}

	});

	app.get("/api/reqPart/:buyer?", function(req, res) {

		if (req.params.buyer) {

			db.Parts.findAll({

				where: {

					buyer: req.params.buyer

				}

			}).then(function(results) {

				res.json(results);

			});

		}else {

			db.Parts.findAll({}).then(function(results) {

				res.json(results);

			});

		}

	});

	app.get("/api/poLines/:pn?", function(req, res) {

		if (req.params.pn) {

			db.Purchase_order_lines.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results, error) {

				if (error) return error;

				res.json(results);

			});

		}

		else {

			db.Purchase_order_lines.findAll({}).then(function(results, error) {

				if (error) return error;

				res.json(results);

			});

		}

	});

	app.get("/api/salesOrders/:pn?", function(req, res) {

		if (req.params.pn) {

			db.Sales_orders.findAll({

				where: {

					pn: req.params.pn

				}

			}).then(function(results, error) {

				if (error) {

					res.send('error');

				};

				res.json(results);

			});

		}

		else {

			db.Sales_orders.findAll({}).then(function(results, error) {

				if (error) return error;

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
