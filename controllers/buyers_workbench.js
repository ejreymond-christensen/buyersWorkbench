var express = require("express");

var router = express.Router();

var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
 console.log("test");
 res.render("index");
});

router.post("/user/create", function(req, res) {
	console.log("test2");
	console.log(req.body);
		db.User.create({
		name: req.body.name,
		employeeID: req.body.employeeID,
		employeeRole: req.body.employeeRole
	}).then(function(dbUser){
		console.log("route" + dbUser);
		res.redirect("/");
	});
});


router.get("/user", function(req, res) {
	console.log("result " + req.body);
db.User.findAll({}).then(function(dbUser) {
	res.json(dbUser);
	console.log("result2 " + dbUser);
});	
});

module.exports = router;
