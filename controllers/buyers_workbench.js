var express = require("express");

var router = express.Router();

var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
 
});
router.post("user/create", function(req, res) {
	db.User.create({
		name: req.body.name,
		employeeID: req.body.employeeID,
		employeeRole: req.body.employeeRole
	}).then(function(dbUser){
		console.log("route" + dbUser);
		res.redirect("/");
	});
});


module.exports = router;
