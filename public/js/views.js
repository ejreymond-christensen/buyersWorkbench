
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

	$(".register-form").on("click", function(event) {
		event.preventDefault();
		var newUser = {
			name: $("#name").val().trim(),
			employeeID: $("#employeeID").val().trim(),
			employeeRole: $("#employeeRole").val().trim()
		};

		console.log("test" + name);
		console.log("test" + employeeID);
		console.log("test" + employeeRole);

		$.ajax("/user/create", {
			type: "POST",
			data: newUser
		}).then(function(){
			console.log("new user added");
			location.reload();
		});
	});




