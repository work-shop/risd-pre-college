"use strict";

function orientation( config ) {
    console.log("orientation.js loaded");

    $(document).ready( function() {
        $(window).resize( function() {
            var landscape = window.innerWidth > window.innerHeight;

            if ( landscape ) {

                $( config.selector ).addClass("landscape").removeClass("portrait");

            } else {

                $( config.selector ).addClass("portrait").removeClass("landscape");

            }

        });
    });
}

export { orientation };
