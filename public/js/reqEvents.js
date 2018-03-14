$(document).ready(function(){
  var reqArray= [];
  $('#submitBtn').on("click", function(event){
    event.preventDefault();
    console.log("coucou");
    var lineCount= 1;
    $('tbody').find('tr').each(function(){

      if ($(this).find(':checkbox').is(':checked')) {
        var poLine= {
          "vendor": $(this).find('.vendorInput').val(),
          "po_ln": lineCount,
          "pn": $(this).find('.pnInput').text(),
          "qty": $(this).find('.qtyInput').val(),
          "date": $(this).find('.dateInput').val(),
        };
        console.log(poLine);
        lineCount++;
        reqArray.push(poLine);
        console.log(reqArray);
      }
      $.post("/api/purchase", JSON.stringify(reqArray)).then(function(){
        // location.reload();
      });
    });
    // console.log(reqArray);
  });
});
