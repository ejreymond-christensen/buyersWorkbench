//register name
var myName = document.getElementById("name");
// When the user clicks on the password field, show the message box
myName.onfocus = function() {
    document.getElementById("message1").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myName.onblur = function() {
    document.getElementById("message1").style.display = "none";
}

// When the user starts to type something inside the password field
myName.onkeyup = function() {
document.getElementById("message1").style.display = "none";
}
//register buyerID
var myID = document.getElementById("buyerID");
// When the user clicks on the password field, show the message box
myID.onfocus = function() {
    document.getElementById("message2").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myID.onblur = function() {
    document.getElementById("message2").style.display = "none";
}

// When the user starts to type something inside the password field
myID.onkeyup = function() {
document.getElementById("message2").style.display = "none";
}
//register role
var myRole = document.getElementById("employeeRole");
// When the user clicks on the password field, show the message box
myRole.onfocus = function() {
    document.getElementById("message3").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myRole.onblur = function() {
    document.getElementById("message3").style.display = "none";
}

// When the user starts to type something inside the password field
myRole.onkeyup = function() {
document.getElementById("message3").style.display = "none";
}


//sign in name
var signInName = document.getElementById("employeeName2");
// When the user clicks on the password field, show the message box
signInName.onfocus = function() {
    document.getElementById("message4").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
signInName.onblur = function() {
    document.getElementById("message4").style.display = "none";
}

// When the user starts to type something inside the password field
signInName.onkeyup = function() {
document.getElementById("message4").style.display = "none";
}
//sign in ID
var signInID = document.getElementById("buyerID2");
// When the user clicks on the password field, show the message box
signInID.onfocus = function() {
    document.getElementById("message5").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
signInID.onblur = function() {
    document.getElementById("message5").style.display = "none";
}

// When the user starts to type something inside the password field
signInID.onkeyup = function() {
document.getElementById("message5").style.display = "none";
}

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
		for (var i=0; i< data.length; i++) {
			console.log("data " + data[0].employeeID);
			console.log("data " + data[i].employeeID);
		if (idCheck == data[i].employeeID){
			window.location.href = "/req";
		}
		}
	});
});




// var salesData=[
// {Vendor:'Mac Book',Qty: 600},
// {Vendor:'EA',Qty: 400},
// {Vendor:'Apple',Qty: 580},
// {Vendor:'Dell',Qty: 900}
// ];

// var svg=d3.select("svg");

// var padding={top: 20, right: 30, bottom: 30, left: 50};

// var colors=d3.schemeCategory20c;

// var chartArea={
// 	"width":parseInt(svg.style("width"))-padding.left-padding.right,
// 	"height":parseInt(svg.style("height"))-padding.top-padding.bottom};
// var yScale = d3.scaleLinear()
// 	.domain([0, d3.max(salesData, function(d, i){return d.Qty})])
// 	.range([chartArea.height, 0]).nice();

// var xScale = d3.scaleBand()
// 	.domain(salesData.map(function(d) {return d.Vendor}))
// 	.range([0, chartArea.width])
// 	.padding(.2);

// var xAxis=svg.append("g")
// 	.classed("xAxis", true)
// 	.attr(
// 		'transform', 'translate('+padding.left+', '+(chartArea.height+ padding.top)+' )'
// 		)
// 	.call(d3.axisBottom(xScale));

// var yAxisFn=d3.axisLeft(yScale);
// var yAxis=svg.append("g")
// 	.classed("yAxis", true)
// 	.attr(
// 		'transform', 'translate('+padding.left+', '+padding.top+' )'
// 		);
// 	yAxisFn(yAxis);

// var grid=svg.append("g")
// 	.attr("class", "grid")
// 	.attr(
// 		'transform', 'translate('+padding.left+', '+padding.top+' )'
// 		)
// 	.call(d3.axisLeft(yScale)
// 		.tickSize(-(chartArea.width))
// 		.tickFormat("")
// 		);

// var rectGrp=svg.append("g").attr(
// 	'transform', 'translate('+padding.left+', '+padding.top+')'
// 	);
// rectGrp.selectAll("rect").data(salesData).enter()
// 	.append("rect")
// 	.attr("width", xScale.bandwidth())
// 	.attr("height", function (d, i) {
// 		return chartArea.height-yScale(d.Qty);
// 	})
// 	.attr("x", function (d, i) {
// 		return xScale(d.Vendor);
// 	})
// 	.attr("y", function (d, i) {
// 		return yScale(d.Qty);
// 	})
// 	.attr("fill", function (d, i) {
// 		return colors[i];
// 	})


});	


