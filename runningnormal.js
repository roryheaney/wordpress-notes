var DTC = {
  //Instantiate UI Datepicker
  datechooser: function() {
      $("#checkInDate, #checkOutDate").datepicker({
        showOn: "both",
          clickInput: true,
          minDate: +0,
          dateFormat: "mm/dd/yy"
      });
  }, 
  // Fix booking widget date submission
  fixBookingEngine: function() {
                        
               var form = document.getElementById('booking-form');
            if(!form) return;
            
            var inMo = document.createElement('input'),
                inYr = document.createElement('input'),
                inDy = document.createElement('input'),
                outMo = document.createElement('input'),
                outYr = document.createElement('input'),
                outDy = document.createElement('input');
                    
            inMo.type = inYr.type = inDy.type = outMo.type = outYr.type = outDy.type = 'hidden';
            
            inMo.name = 'CIM';
            inYr.name = 'CIY';
            inDy.name = 'CID';
            outMo.name = 'COM';
            outYr.name = 'COY';
            outDy.name = 'COD';
            
            form.appendChild(inMo);
            form.appendChild(inYr);
            form.appendChild(inDy);
            form.appendChild(outMo);
            form.appendChild(outYr);
            form.appendChild(outDy);
            
            
            var dateFormat = /(\d{2})\/(\d{2})\/(\d{4})/;
            
            var inDate = document.getElementById('checkInDate'),//needs to be changed
                outDate = document.getElementById('checkOutDate');//needs to be changed
            
            //change CheckInDate and CheckOutDate to crazy format
            $('#booking-form').on('submit', function(e) {
                            
                    var inMatches = inDate.value.match(dateFormat),
                        outMatches = outDate.value.match(dateFormat);
                            
                    if(!inMatches || !outMatches) {
                            e.preventDefault();
                            //error, omg die...
                    }
                    
                    inMo.value = inMatches[1];
                    inDy.value = inMatches[2];
                    inYr.value = inMatches[3];
                    
                    outMo.value = outMatches[1];
                    outDy.value = outMatches[2];
                    outYr.value = outMatches[3];
                    
                    inDate.value = '';
                    outDate.value= '';
            });
  
  }
};
$(document).on("ready", function() {
    DTC.datechooser(),
    DTC.fixBookingEngine()
});