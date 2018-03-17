var express = require("express");
var router = express.Router();

var db = require("../models/");

//Creates the PO in Purchase_orders and Purchase_order_lines
function addPoAndPoLine(request, i) {
  console.log("req func" + request);
  db.Purchase_orders.create({vendor: request.vendor}).then(function(results) {
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

  // get route -> index
  app.get("/", function(req, res) {
    // send us to the next get function instead.
    console.log("test");
    res.render("index");
  });

  //Route to create a user
  app.post("/user/create", function(req, res) {
    console.log("test2");
    console.log(req.body);
    db.User.create({name: req.body.name, employeeID: req.body.employeeID, employeeRole: req.body.employeeRole}).then(function(dbUser) {
      console.log("route" + dbUser);
      res.redirect("/");
    });
  });

  //Route for user log in
  app.get("/user", function(req, res) {
    console.log("result " + req.body);
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
      console.log("result2 " + dbUser);
    });
  });

  //Posts the PO
  app.post("/api/purchase", function(req, res) {
    console.log(req.body);
    addPoAndPoLine(req.body, 1);
    res.send("Complete");
  });

  //Updates the forecast
  app.put("/api/forecastUpdate", function(req, res) {
    db.Parts.update({
      current_f: req.body.qty
    }, {
      where: {
        pn: req.body.pn
      }
    }).then(function(result) {
      console.log(result);
    });
  });

  //GET for part info
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
        } else {
          res.json(results);
        }
      });
    } else {
      db.Parts.findAll({
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  //GET for req
  app.get("/api/reqPart/:buyer?", function(req, res) {
    if (req.params.buyer) {
      db.Parts.findAll({
        where: {
          buyer: req.params.buyer
        }
      }).then(function(results) {
        res.json(results);
      });
    } else {
      db.Parts.findAll({}).then(function(results) {
        res.json(results);
      });
    }
  });

  //GET for po lines
  app.get("/api/poLines/:pn?", function(req, res) {
    if (req.params.pn) {
      db.Purchase_order_lines.findAll({
        where: {
          pn: req.params.pn
        }
      }).then(function(results, error) {
        if (error)
          return error;
        res.json(results);
      });
    } else {
      db.Purchase_order_lines.findAll({
      }).then(function(results, error) {
        if (error)
          return error;
        res.json(results);
      });
    }
  });

  //GET for SOs
  app.get("/api/salesOrders/:pn?", function(req, res) {
    if (req.params.pn) {
      db.Sales_orders.findAll({
        where: {
          pn: req.params.pn
        }
      }).then(function(results, error) {
        if (error) {
          res.send('error');
        }
        res.json(results);
      });
    } else {
      db.Sales_orders.findAll({
      }).then(function(results, error) {
        if (error)
          return error;
        res.json(results);
      });
    }
  });
};
