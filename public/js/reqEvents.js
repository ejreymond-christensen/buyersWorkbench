$(document).ready(function() {
  //Temp array to store Req
  var reqArray = [];
  var partsList;
  //Event listener to submit the POs
  $('#submitBtn').on("click", function(event) {
    event.preventDefault();
    //counter for the line
    var lineCount = 1;
    //jQuery to grab all reqlines
    $('tbody').find('tr').each(function() {
      //Checks if the submit checkbox is true
      if ($(this).find(':checkbox').is(':checked')) {
        //creates object for data
        var poLine = {
          "vendor": $(this).find('.vendorNameInput').text(),
          "po_ln": lineCount,
          "pn": $(this).find('.pnInput').text(),
          "qty": $(this).find('.qtyInput').val(),
          "date": $(this).find('.dateInput').val()
        };
        // Vars for calculating forecast
        var current_f;
        var now = moment();
        var poLineDate = moment(poLine.date);
        // validates the QTY and date
        if (parseInt(poLine.qty) > 0 && isNaN(poLine.qty) === false && poLineDate.isAfter(now)) {
          for (var i = 0; i < partsList.length; i++) {
            //Checks the PO line PN and compares to db Parts
            if (parseInt(partsList[i].pn) === parseInt($(this).find('.pnInput').text())) {
              //Takes the database current forecast and adds the Qty off PO
              current_f = partsList[i].current_f + parseInt($(this).find('.qtyInput').val());
            }
          }
          //sets forecast object for update
          var forecastQty = {
            pn: $(this).find('.pnInput').text(),
            qty: current_f
          };

          lineCount++;
          //Pushes the po line to the req array
          reqArray.push(poLine);

          //updates the current months forecast when PO is placed
          $.ajax({method: "PUT", url: "/api/forecastUpdate", data: forecastQty}).then(function() {});

          //posts the PO to the DB
          $.post("/api/purchase", poLine).then(function() {
            location.reload();
          });
        } else {
          alert("Something went wrong with purchase order creation! Please try again.");
        }
      }
    });
  });

  //Filters req by buyer number.
  $('#buyerBtn').on("click", function(event) {
    event.preventDefault();
    var buyerNum = $('#buyerInput').val().trim();
    reqLookup(buyerNum);
  });

  // function on load
  var reqLookup = function(buyer) {
    var poList;
    var soList;
    //GET request for all parts
    var getinfo = function(buyer) {
      //If buyer specified only pull those
      if (buyer > 0) {
        $.get("/api/reqPart/" + buyer).then(function(result) {
          partsList = result;
        }).then(function() {
          getinfo2();
        });
        //If no buyer, pull all parts
      } else {
        $.get("/api/reqPart/").then(function(result) {
          partsList = result;
        }).then(function() {
          getinfo2();
        });
      }
    };

    //Pulls all PO's
    var getinfo2 = function() {
      $.get("/api/poLines/").then(function(result) {
        poList = result;
      }).then(function() {
        getinfo3();
      });
    };

    //GET all SO's
    var getinfo3 = function() {
      $.get("/api/salesOrders/").then(function(result) {
        soList = result;
      }).then(function() {
        getinfo4();
      });

    };

    //invokes function to calculate if ordering is needed.
    var getinfo4 = function() {
      calcReq(partsList, soList, poList);
    };
    getinfo(buyer);
  };

  //Calculates if PO needs to be placed.
  var calcReq = function(partsList, soList, poList) {
    $('#reqBody').empty();
    var minDate = moment().format("YYYY MM DD").split(" ").join("-");
    //Loops through all parts
    for (var i = 0; i < partsList.length; i++) {
      var currentPn = partsList[i].pn;

      var currentDemand = 0;
      var currentSupply = 0;
      //If an SO has that part take Qty and add to demand
      for (var y = 0; y < soList.length; y++) {
        if (soList[y].pn === currentPn) {
          currentDemand = currentDemand + soList[y].order_qty;
        }
      }
      //If an PO has that part take Qty and add to supply
      for (var z = 0; z < poList.length; z++) {
        if (poList[z].pn === currentPn) {
          currentSupply = currentSupply + poList[z].order_qty;
        }
      }
      // Calculates the supply and demand, if order needed adds to requesitions
      if (((currentDemand + partsList[i].ss) - (currentSupply + partsList[i].qoh)) > 0) {
        var qty = (currentDemand + partsList[i].ss) - (currentSupply + partsList[i].qoh);
        var dueDate = moment().add(partsList[i].lt_days, "days").format("YYYY MM DD");
        var reqDate = dueDate.split(" ").join("-");

        var line = '<tr class="table-light"><td class="check"><div class="form-check"><input class="form-check-input" type="checkbox" value=""></div></td><td>' + partsList[i].buyer + '</td><td class= "pnInput"><a href="iteminfo/' + partsList[i].pn + '" target="_blank">' + partsList[i].pn + '</a></td><td class= "dscInput">' + partsList[i].description + '</td><td class="vendor"><input class="form-control form-control-sm vendorInput" type="text" name="vendor" value="' + partsList[i].vendor + '" disabled></td><td class= "vendorNameInput">' + partsList[i].vendor_name + '</td><td class="qty"><input class="form-control form-control-sm qtyInput" type="text" name="qty" value="' + qty + '"></td><td class="date"><input class="form-control form-control-sm dateInput" type="date" name="date" value="' + reqDate + '" min="' + minDate + '"></td></tr>';

        $('#reqBody').append(line);
      }
    }
  };
  reqLookup();
});
