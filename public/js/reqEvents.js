$(document).ready(function(){
  var reqArray= [];
  $('#submitBtn').on("click", function(event){
    event.preventDefault();
    var lineCount= 1;
    $('tbody').find('tr').each(function(){
      if ($(this).find('.checkbox').is(':checked')) {
        var poLine= {
          "vendor": $(this).find('.vendorInput').val(),
          "po_ln": lineCount,
          "pn": $(this).find('.pn').text(),
          "qty": $(this).find('.qtyInput').val(),
          "date": $(this).find('.dateInput').val(),
        };
        lineCount++;
        reqArray.push(poLine);
        console.log(reqArray)
      }
      $.ajax("/api/purchase", {
        type: "POST",
        data: reqArray
      }).then(function(){
        // location.reload();
      });
    });
    // console.log(reqArray);
  });


});
