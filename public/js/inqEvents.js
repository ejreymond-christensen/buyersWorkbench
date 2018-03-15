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







var salesData=[
{Vendor:'Mac Book',Qty: 600},
{Vendor:'EA',Qty: 400},
{Vendor:'Apple',Qty: 580},
{Vendor:'Dell',Qty: 900}
];

var svg=d3.select("svg");

var padding={top: 20, right: 30, bottom: 30, left: 50};

var colors=d3.schemeCategory20c;

var chartArea={
  "width":parseInt(svg.style("width"))-padding.left-padding.right,
  "height":parseInt(svg.style("height"))-padding.top-padding.bottom};
var yScale = d3.scaleLinear()
  .domain([0, d3.max(salesData, function(d, i){return d.Qty})])
  .range([chartArea.height, 0]).nice();

var xScale = d3.scaleBand()
  .domain(salesData.map(function(d) {return d.Vendor}))
  .range([0, chartArea.width])
  .padding(.2);

var xAxis=svg.append("g")
  .classed("xAxis", true)
  .attr(
    'transform', 'translate('+padding.left+', '+(chartArea.height+ padding.top)+' )'
    )
  .call(d3.axisBottom(xScale));

var yAxisFn=d3.axisLeft(yScale);
var yAxis=svg.append("g")
  .classed("yAxis", true)
  .attr(
    'transform', 'translate('+padding.left+', '+padding.top+' )'
    );
  yAxisFn(yAxis);

var grid=svg.append("g")
  .attr("class", "grid")
  .attr(
    'transform', 'translate('+padding.left+', '+padding.top+' )'
    )
  .call(d3.axisLeft(yScale)
    .tickSize(-(chartArea.width))
    .tickFormat("")
    );

var rectGrp=svg.append("g").attr(
  'transform', 'translate('+padding.left+', '+padding.top+')'
  );
rectGrp.selectAll("rect").data(salesData).enter()
  .append("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", function (d, i) {
    return chartArea.height-yScale(d.Qty);
  })
  .attr("x", function (d, i) {
    return xScale(d.Vendor);
  })
  .attr("y", function (d, i) {
    return yScale(d.Qty);
  })
  .attr("fill", function (d, i) {
    return colors[i];
  })

});
