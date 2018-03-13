
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		name: DataTypes.STRING,
		employeeID: DataTypes.INTEGER,
		employeeRole: DataTypes.STRING
	});
	return User;
};
	









