$(document).ready(function() {

  $("#pnSearch").on("click", function(event) {
    event.preventDefault();

    var soTotal="0";
    var poTotal="0";
    var ssTotal="";
    var qohTotal="";
    //captures searched part and then clears the input field.
    var pn = $("#pnInput").val().trim();
    $("#pnInput").val('');

    $.ajax("/api/part/" + pn, {
      type: "GET"
    }).then(function(result){
      $("#pn").text(result[0].pn);
      $("#desc").text(result[0].description);
      $("#rev").text(result[0].rev);
      $("#buyer").text(result[0].buyer);
      $("#vendor").text(result[0].vendor);
      $("#type").text(result[0].type);
      $("#lt_days").text(result[0].lt_days);
      $("#ord_qty").text(result[0].ord_qty);
      $("#cost").text(result[0].cost);
      $("#list").text(result[0].sales_price);
      $("#qoh").text(result[0].qoh);
      $("#uom").text(result[0].uom);
      $("#ss").text(result[0].ss);
      $("#commited").text(result[0].commited);

      ssTotal= result[0].ss;
      qohTotal= result[0].qoh;
    });

    $.ajax("/api/poLines/" + pn, {
      type: "GET"
    }).then(function (result) {
      console.log("PO Lines result below");
      console.log(result);
      $("#poTable").empty();

      if (result.length === 0) {
        var emptyPO= '<td class="table-light" colspan="5"> No Current Purchase Orders</td>';
        $("#poTable").append(emptyPO);
        poTotal= 0;
      }else{
        for (var i = 0; i < result.length; i++){
          var poLine= "<tr class='table-light'><td>"+result[i].po_number+"</td><td>"+result[i].po_ln+"</td><td></td><td>"+result[i].order_qty+"</td><td>"+result[i].due_date+"</td></tr>";

          $("#poTable").append(poLine);

          poTotal= parseInt(poTotal) + parseInt(result[i].order_qty);
        }
      }
    });

    $.ajax("/api/salesOrders/" + pn, {
      type: "GET"
    }).then(function (result) {
      $("#soTable").empty();
      console.log(result.length);
      if (result.length === 0) {
        var empty= '<td class="table-light" colspan="5"> No Current Sales Orders</td>';
        $("#soTable").append(empty);
        soTotal= 0;
      }
      else{
        for (var i = 0; i < result.length; i++) {
          var soLine= "<tr class='table-light'><td>"+result[i].so_num+"</td><td>"+result[i].so_ln+"</td><td>"+result[i].customer+"</td><td>"+result[i].order_qty+"</td><td>"+result[i].due_date+"</td></tr>";
          $("#soTable").append(soLine);

          soTotal= parseInt(soTotal) + parseInt(result[i].order_qty);
        }
      }

        console.log("SO "+soTotal+" , SS "+ssTotal+" , PO "+poTotal+" , QOH "+qohTotal);
        $("#tDemand").text(parseInt(soTotal)+parseInt(ssTotal));
        $("#tSupply").text(parseInt(poTotal)+parseInt(qohTotal));
        $("#ordQty").text((parseInt(poTotal)+parseInt(qohTotal))-(parseInt(soTotal)+parseInt(ssTotal)));
    });
  });

});
