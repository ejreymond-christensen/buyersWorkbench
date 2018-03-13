// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// var path = require("path");

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