// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// var path = require("path");

var db = require("../models/");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.render("login");
  });
  // index route loads itemInfo.handlebars
  app.get("/itemInfo", function(req, res) {
    res.render("iteminfo");
    console.log("Trying to get to item info");
  });

  // cms route loads login.handlebars
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // blog route loads req.handlebars
  app.get("/req", function(req, res) {
    res.render("req");
  });

  app.get('/users', (req, res) => {  
    db.Parts.findAll({
      include: [
        {
          model: db.Purchase_order_lines,
        }
      ]
    }).then(Parts => {
      const resObj = Parts.map(user => {

        //tidy up the user data
        return Object.assign(
          {},
          {
            pn: user.pn,
            description: user.description,
            buyer: user.buyer,
            Purchase_order_lines: user.Purchase_order_lines.map(post => {

              //tidy up the post data
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