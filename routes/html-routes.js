var path = require("path");

module.exports = function(app) {

	router.get("/req", function(req, res) {

    	res.sendFile(path.join(__dirname, "../public/req.html"));

  	});

};