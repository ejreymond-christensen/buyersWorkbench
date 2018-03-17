//Populates the PartsList page
$(document).ready(function() {
	$.ajax("/api/part", {
    	type: "GET"
	}).then(function(result) {
		for (var i = 0; i < result.length; i++) {
			var line = "<tr class='table-light'><td class='pn'><a href='/iteminfo/" + result[i].pn + "'>" + result[i].pn + "</a></td><td class='description'>" + result[i].description + "</td><td class='buyer'>" + result[i].buyer + "</td><td class='vendor'>" + result[i].vendor + "</td><td class='salesPrice'>" + result[i].sales_price + "</td><td class='orderQty'>" + result[i].ord_qty + "</td><td class='qoh'>" + result[i].qoh + "</td><td class='ss'>" + result[i].ss + "</td></tr>";

			$("#partsListTable").append(line);
		}
	});
});
