(function() {

    function callSvc(_name) {
        $.ajax({
                method: "GET",
                url: "/discover",
                data: {
                    service: _name
                }
            })
            .done(function(msg) {
                var aCodes = document.getElementsByTagName('code');
                aCodes[0].innerHTML = JSON.stringify(msg, null, 2);


                for (var i=0; i < aCodes.length; i++) {
                    hljs.highlightBlock(aCodes[i]);
                }

            });
    };

    $('.btn-primary').click(function(e) {

      e.preventDefault();
      callSvc( $('#service_name').val() );
    });


})();
