//register name
var myName = document.getElementById("name");
// When the user clicks on the password field, show the message box
myName.onfocus = function() {
    document.getElementById("message1").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myName.onblur = function() {
    document.getElementById("message1").style.display = "none";
};

// When the user starts to type something inside the password field
myName.onkeyup = function() {
document.getElementById("message1").style.display = "none";
};

//register buyerID
var myID = document.getElementById("buyerID");

// When the user clicks on the password field, show the message box
myID.onfocus = function() {
    document.getElementById("message2").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myID.onblur = function() {
    document.getElementById("message2").style.display = "none";
};

// When the user starts to type something inside the password field
myID.onkeyup = function() {
document.getElementById("message2").style.display = "none";
};

//register role
var myRole = document.getElementById("employeeRole");

// When the user clicks on the password field, show the message box
myRole.onfocus = function() {
    document.getElementById("message3").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myRole.onblur = function() {
    document.getElementById("message3").style.display = "none";
};

// When the user starts to type something inside the password field
myRole.onkeyup = function() {
document.getElementById("message3").style.display = "none";
};


//sign in name
var signInName = document.getElementById("employeeName2");
// When the user clicks on the password field, show the message box
signInName.onfocus = function() {
    document.getElementById("message4").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
signInName.onblur = function() {
    document.getElementById("message4").style.display = "none";
};

// When the user starts to type something inside the password field
signInName.onkeyup = function() {
document.getElementById("message4").style.display = "none";
};
//sign in ID
var signInID = document.getElementById("buyerID2");
// When the user clicks on the password field, show the message box
signInID.onfocus = function() {
    document.getElementById("message5").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
signInID.onblur = function() {
    document.getElementById("message5").style.display = "none";
};

// When the user starts to type something inside the password field
signInID.onkeyup = function() {
document.getElementById("message5").style.display = "none";
};

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});

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
		for (var i=0; i< data.length; i++) {
			console.log("data " + data[0].employeeID);
			console.log("data " + data[i].employeeID);
		if (idCheck == data[i].employeeID){
			window.location.href = "/req";
		}
		}
	});
});

});
