$(
    function() {
    $('a#process_input').bind('click', 
        function() {
            $.getJSON('/__background_process',
                    {   
                        proglang: $('div#testValue').val(),
                    }, 
                    function(data) {
                        $("#result").text(data.result);
                    });
            return false;
        } );
    } );

// $(
//     function() {
//     $('a#process_input').bind('click', 
//         function() {
//             $.getJSON('/__tracking_bg_process',
//                     {   
//                         trackingValue: $('.trackingValue span').val(),
//                         // trackingValue: $('span[name="tracker"]').val(),
//                     }, 
//                     function(data) {
//                         $("#result").text(data.result);
//                     });
//             return false;
//         } );
//     } );