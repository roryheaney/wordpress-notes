// Modified http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
// Only fires on body class (working off strictly WordPress body_class)

var southernmost = {
  // All pages
  common: {
    init: function() {
      // JS here
        //Instantiate UI Datepicker
       $("#checkInDate, #checkOutDate").datepicker({
          showOn: "both",
            clickInput: true,
            minDate: +0,
            dateFormat: "mm/dd/yy"
        });

       $.fn.valueph = function() {
          //This is for the resveration module
            var arrivetext = 'Check-In';
              var departText = 'Check-Out'; 
              
              jQuery('#booking-form .in input').attr('value', arrivetext);
              
              jQuery('#booking-form .in input').bind('focus', function() {
              el = jQuery(this);
              if (el.val() === arrivetext)  el.attr('value', '');
            });
              
              jQuery('#booking-form .in input').bind('focusout', function() {
              el = jQuery(this);
                  //if ($.trim(el.val()) === '')  el.attr('value', searchLabel); 
              if (jQuery.trim(el.val()) === ''){ 
                el.attr('value', arrivetext);
              }
            });
            
            jQuery('#booking-form .out input').attr('value', departText);
              
              jQuery('#booking-form .out input').bind('focus', function() {
              el = jQuery(this);
              if (el.val() === departText)  el.attr('value', '');
            });
              
              jQuery('#booking-form .out input').bind('focusout', function() {
              el = jQuery(this);
                  //if ($.trim(el.val()) === '')  el.attr('value', searchLabel); 
              if (jQuery.trim(el.val()) === ''){ 
                el.attr('value', departText);
              }
            });

         };//end of function valueph

        $('.res-widget form').valueph();//run function valueph

        $.fn.breakoutdates = function() {

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

         };//end of function breakoutdates

        $('.res-widget form').breakoutdates();//run function breakoutdates



    },
    finalize: function() { }
  },
  // Home page
  home: {
    init: function() {
      // JS here
    }
  },
  // About page
  about: {
    init: function() {
      // JS here
    }
  }
};

var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = southernmost;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {

    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });

    UTIL.fire('common', 'finalize');
  }
};

$(document).ready(UTIL.loadEvents);