$(document).ready(function() {
  var reqArray = [];
  var partsList;
  $('#submitBtn').on("click", function(event) {
    event.preventDefault();
    var lineCount = 1;
    $('tbody').find('tr').each(function() {

      if ($(this).find(':checkbox').is(':checked')) {
        var poLine = {
          "vendor": $(this).find('.vendorNameInput').text(),
          "po_ln": lineCount,
          "pn": $(this).find('.pnInput').text(),
          "qty": $(this).find('.qtyInput').val(),
          "date": $(this).find('.dateInput').val()
        };
        var current_f;

        var now = moment();
        var poLineDate = moment(poLine.date);
        if (parseInt(poLine.qty) > 0 && parseInt(poLine.qty) !== NaN && poLineDate.isAfter(now)) {

          for (var i = 0; i < partsList.length; i++) {
            if (parseInt(partsList[i].pn) === parseInt($(this).find('.pnInput').text())) {
              current_f = partsList[i].current_f + parseInt($(this).find('.qtyInput').val());
            }
          }
          var forecastQty = {
            pn: $(this).find('.pnInput').text(),
            qty: current_f
          };
          lineCount++;
          reqArray.push(poLine);

          $.ajax({method: "PUT", url: "/api/forecastUpdate", data: forecastQty}).then(function() {});

          $.post("/api/purchase", poLine).then(function() {
            location.reload();
          });
        } else {
          alert("Something went wrong with purchase order creation! Please try again.");
        }
      }
    });
  });

  $('#buyerBtn').on("click", function(event) {
    event.preventDefault();
    var buyerNum = $('#buyerInput').val().trim();
    reqLookup(buyerNum);
  });

  // function on load
  var reqLookup = function(buyer) {
    var poList;
    var soList;
    var getinfo = function(buyer) {
      if (buyer > 0) {
        $.get("/api/reqPart/" + buyer).then(function(result) {
          partsList = result;
        }).then(function() {
          getinfo2();
        });
      } else {
        $.get("/api/reqPart/").then(function(result) {
          partsList = result;
        }).then(function() {
          getinfo2();
        });
      }
    };

    var getinfo2 = function() {
      $.get("/api/poLines/").then(function(result) {
        poList = result;
      }).then(function() {
        getinfo3();
      });
    };
    var getinfo3 = function() {
      $.get("/api/salesOrders/").then(function(result) {
        soList = result;
      }).then(function() {
        getinfo4();
      });

    };
    var getinfo4 = function() {
      calcReq(partsList, soList, poList);
    };
    getinfo(buyer);
  };

  var calcReq = function(partsList, soList, poList) {
    $('#reqBody').empty();
    var minDate = moment().format("YYYY MM DD").split(" ").join("-");
    for (var i = 0; i < partsList.length; i++) {
      var currentPn = partsList[i].pn;

      var currentDemand = 0;
      var currentSupply = 0;
      for (var y = 0; y < soList.length; y++) {
        if (soList[y].pn === currentPn) {
          currentDemand = currentDemand + soList[y].order_qty;
        }
      }
      for (var z = 0; z < poList.length; z++) {
        if (poList[z].pn === currentPn) {
          currentSupply = currentSupply + poList[z].order_qty;
        }
      }
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
