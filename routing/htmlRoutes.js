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

  app.get("/partsList", function(req, res) {
    res.render("partsList");
  });

  // index route loads itemInfo.handlebars
  app.get("/iteminfo/:pn?", function(req, res) {
    res.render("itemInfo");
  });

  // cms route loads login.handlebars
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // blog route loads req.handlebars
  app.get("/req", function(req, res) {
    res.render("req");
  });
};
