$(document).ready(function() {
  $("#pnSearch").on("click", function(event) {
    event.preventDefault();
    var pn = $("#pnInput").val().trim();
    console.log(pn);
    $.ajax("/api/part/"+pn, {
      type: "GET"
    }).then(function(result){
      console.log(result);
      // location.reload();
      $("#pn").html(result.pn);
      $("#desc").html(result.description);
      $("#rev").html(result.rev);
      $("#buyer").html(result.buyer);
      $("#vendor").html(result.vendor);
      $("#type").html(result.type);
      $("#lt_days").html(result.lt_days);
      $("#ord_qty").html(result.ord_qty);
      $("#cost").html(result.cost);
      $("#list").html(result.sales_price);
      $("#qoh").html(result.qoh);
      $("#uom").html(result.uom);
      $("#ss").html(result.ss);
      $("#commited").html(result.commited);
    });
  });
});
