$(document).ready(function() {

  //global vars
  var part;

  //jQuery for the Modal
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus');
  });

  //Eventlistener for the part search
  $("#pnSearch").on("click", function(event) {
    event.preventDefault();
    part = $("#pnInput").val().trim();
    //If part is a valid number, we route address to the specific part
    if (part !== "") {
      window.location.href = "/iteminfo/" + part;
    }
  });

  // This functions contains all the GET requests and logic to populate the DOM
  var populateInq = function(res){
    //variables to hold the extracted data to calculate the supply/demand
    var pn = res;
    var soTotal="0";
    var poTotal="0";
    var ssTotal="";
    var qohTotal="";
    /*
    ---===(Promise Chaining the three GET responses so we can get everything and then calculate the Supply/Demand on a PromiseAll)===---
    */
    //Promise for the GET request on Parts
    var partGet = new Promise(function(resolve, reject){
      $.ajax("/api/part/" + pn, {
        type: "GET",
        error: function() {
        }
      }).then(function(result){
        //Validation if the part Exists.
        if (result.length ===0) {
          alert("Aïe! This part doesn't exist!");
        }else{
        //Populates the DOM with part info
        $("#pn").text(result[0].pn);
        $("#desc").text(result[0].description);
        $("#rev").text(result[0].rev);
        $("#buyer").text(result[0].buyer);
        $("#vendor").text(result[0].vendor);
        $("#vendorName").text(result[0].vendor_name);
        $("#type").text(result[0].type);
        $("#lt_days").text(result[0].lt_days);
        $("#ord_qty").text(result[0].ord_qty);
        $("#cost").text(result[0].cost);
        $("#list").text(result[0].sales_price);
        $("#qoh").text(result[0].qoh);
        $("#uom").text(result[0].uom);
        $("#ss").text(result[0].ss);
        $("#commited").text(result[0].committed);

        //Pushes current safety stock and QOH, so we can access them for the demand/supply function.
        ssTotal= result[0].ss;
        qohTotal= result[0].qoh;

        //Sets data for the D3 forecast chart.
        salesData =[
        {Vendor:'Past 90',Qty: parseInt(result[0].ninety_past)},
        {Vendor:'Past 60',Qty: parseInt(result[0].sixty_past)},
        {Vendor:'Past 30',Qty: parseInt(result[0].Thrity_past)},
        {Vendor:'Current Quater',Qty: parseInt(result[0].current_f)},
        {Vendor:'Future Quater',Qty: Math.ceil((parseInt(result[0].ninety_past)+parseInt(result[0].sixty_past)+parseInt(result[0].Thrity_past))/3)}
        ];

        //Loads the D3 Chart.
        chartload();

        //Resolve to fufill the promise.
        resolve("Parts GET success!");
        }
      });
    });

    //Promise for the GET request on PO's
    var poGet = new Promise(function(resolve, reject){
      $.ajax("/api/poLines/" + pn, {
        type: "GET"
      }).then(function (result) {
        //Clears existing data
        $("#poTable").empty();
        //if no PO's exist advise the user with text
        if (result.length === 0) {
          var emptyPO= '<td class="table-light" colspan="5"> No Current Purchase Orders</td>';
          $("#poTable").append(emptyPO);
          //Pushs Supply Data to variables.
          poTotal= 0;
        }else{
          //If POs are present, append all that match with PN.
          for (var i = 0; i < result.length; i++){
            var poLine= "<tr class='table-light'><td>"+result[i].po_number+"</td><td>"+result[i].po_ln+"</td><td>"+result[i].po_vendor+"</td><td>"+result[i].order_qty+"</td><td>"+result[i].due_date+"</td></tr>";
            $("#poTable").append(poLine);

            //Pushs Supply Data to variables.
            poTotal= parseInt(poTotal) + parseInt(result[i].order_qty);
          }
        }
      }).then(function(){
        //Resolve to fufill the promise
        resolve("PO GET success!");
      });
    });

    //Promise for the GET request on SOs
    var soGet = new Promise(function(resolve, reject){
      $.ajax("/api/salesOrders/" + pn, {
        type: "GET"
      }).then(function(result) {
        $("#soTable").empty();
        //if no SOs exist advise the user with text
        if (result.length === 0) {
          var empty= '<td class="table-light" colspan="5"> No Current Sales Orders</td>';
          $("#soTable").append(empty);
          //Pushs Demand Data to variables.
          soTotal= 0;
        }
        else{
          //If SOs are present, append all that match with PN.
          for (var i = 0; i < result.length; i++) {
            //Pushs Demand Data to variables.
            soTotal= parseInt(soTotal) + parseInt(result[i].order_qty);
            var soLine= "<tr class='table-light'><td>"+result[i].so_num+"</td><td>"+result[i].so_ln+"</td><td>"+result[i].customer+"</td><td>"+result[i].order_qty+"</td><td>"+result[i].due_date+"</td></tr>";
            $("#soTable").append(soLine);
          }
        }
      }).then(function(){
        //Resolve to fufill the promise.
        resolve("SO GET success!");
      });
    });

    //Once all promise callbacks are varified, run the supply/supply demand function, as the extracted data should be present.
    Promise.all([partGet, poGet, soGet]).then(function() {
      $("#tDemand").text(parseInt(soTotal)+parseInt(ssTotal));
      $("#tSupply").text(parseInt(poTotal)+parseInt(qohTotal));
      $("#ordQty").text((parseInt(soTotal)+parseInt(ssTotal))-(parseInt(poTotal)+parseInt(qohTotal)));
    });
  };

  /*---===On page load logic===---*/

  //extracts the part number from the address.
  var url = window.location.href;
  var parsedUrl = url.split("/");
  part = parsedUrl[parsedUrl.length - 1];

  //This statement verifies what part to search via the address. If a part is present it will return that part. If the address is just to the root, we will display 17922, the first existing part in our DB.
  if (part === "iteminfo" || part === "itemInfo" || part ==="") {
    populateInq("17922");
  }
  else {
    populateInq(part);
  }

});

/*---===D3 logic for Forecast Graph and overview graph in dropdown/modal===---*/

//Logic for the Forecast graph. Invoked in the partGet callback via chartload.
var salesData;
var svg=d3.select("svg");
var padding={top: 20, right: 30, bottom: 30, left: 50};
var colors=d3.schemeCategory20c;

var chartload = function(){
  var chartArea={
    "width":parseInt(svg.style("width"))-padding.left-padding.right,
    "height":parseInt(svg.style("height"))-padding.top-padding.bottom};
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(salesData, function(d, i){return d.Qty;})])
    .range([chartArea.height, 0]).nice();

  var xScale = d3.scaleBand()
    .domain(salesData.map(function(d) {return d.Vendor;}))
    .range([0, chartArea.width])
    .padding(0.2);

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
    });
};


//Logic for the Vendor Outlook graph.
var freqData=[
{Vendor:'Mac Book',freq:{Quarter1:4786, Quarter2:1319, Quarter3:249}},
{Vendor:'EA',freq:{Quarter1:1101, Quarter2:412, Quarter3:674}},
{Vendor:'Apple',freq:{Quarter1:932, Quarter2:2149, Quarter3:418}},
{Vendor:'Dell',freq:{Quarter1:832, Quarter2:1152, Quarter3:1862}}
];

dashboard('#dashboard',freqData);


function dashboard(id, fData){
    var barColor = 'steelblue';
    function segColor(c){ return {Quarter1:"#807dba", Quarter2:"#e08214",Quarter3:"#41ab5d"}[c]; }

    // compute total for each Vendor.
    fData.forEach(function(d){d.total=d.freq.Quarter1+d.freq.Quarter2+d.freq.Quarter3;});

    // function to handle histogram.
    function histoGram(fD){
        var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
        hGDim.w = 500 - hGDim.l - hGDim.r;
        hGDim.h = 300 - hGDim.t - hGDim.b;

        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                .domain(fD.map(function(d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("width", x.rangeBand())
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr('fill',barColor)
            .on("mouseover",mouseover)// mouseover is defined below.
            .on("mouseout",mouseout);// mouseout is defined below.

        //Create the frequency labels above the rectangles.
        bars.append("text").text(function(d){ return d3.format(",")(d[1]);})
            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
            .attr("y", function(d) { return y(d[1])-5; })
            .attr("text-anchor", "middle");

        function mouseover(d){  // utility function to be called on mouseover.
            // filter for selected Vendor.
            var st = fData.filter(function(s){ return s.Vendor == d[0];})[0],
                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

            // call update functions of pie-chart and legend.
            pC.update(nD);
            leg.update(nD);
        }

        function mouseout(d){    // utility function to be called on mouseout.
            // reset the pie-chart and legend.
            pC.update(tF);
            leg.update(tF);
        }

        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color){
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);

            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function(d) {return y(d[1]); })
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function(d){ return d3.format(",")(d[1]);})
                .attr("y", function(d) {return y(d[1])-5; });
        };
        return hG;
    }

    // function to handle pieChart.
    function pieChart(pD){
        var pC ={},    pieDim ={w:250, h: 250};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function(d) { this._current = d; })
            .style("fill", function(d) { return segColor(d.data.type); })
            .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        };
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
            // call the update function of histogram with new data.
            hG.update(fData.map(function(v){
                return [v.Vendor,v.freq[d.data.type]];}),segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
            // call the update function of histogram with all data.
            hG.update(fData.map(function(v){
                return [v.Vendor,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) { return arc(i(t));    };
        }
        return pC;
    }

    // function to handle legend.
    function legend(lD){
        var leg = {};

        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');

        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
      .attr("fill",function(d){ return segColor(d.type); });

        // create the second column for each segment.
        tr.append("td").text(function(d){ return d.type;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
            .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
            .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

            // update the percentage column.
            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
        };

        function getLegend(d,aD){ // Utility function to compute percentage.
            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
    }

    // calculate total frequency by segment for all Vendor.
    var tF = ['Quarter1','Quarter2','Quarter3'].map(function(d){
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
    });

    // calculate total frequency by Vendor for all segment.
    var sF = fData.map(function(d){return [d.Vendor,d.total];});

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg= legend(tF);  // create the legend.
}
