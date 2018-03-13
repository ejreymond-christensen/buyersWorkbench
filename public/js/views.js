
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$(document).ready(function() {
$("#submit").on("click", function(event) {
		event.preventDefault();
		var newUser = {
			name: $("#name").val().trim(),
			employeeID: $("#buyerID").val().trim(),
			employeeRole: $("#employeeRole").val().trim()
		};


		$.ajax("/user/create", {
			type: "POST",
			data: newUser
		}).then(function(){
			location.reload();
		});
	});

$("#signInSubmit").on("click", function(event) {
	event.preventDefault();
	idCheck = $("#buyerID2").val().trim();
	console.log("ID Check " + idCheck);
	
	$.get("/user", function(data){
		for (var i=0; i< data.lenth; i++) {
			conosle.log("data " + data[i].employeeID)
		}
	});
});



})	


	




