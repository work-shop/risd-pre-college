"use strict";

function overlay( config ) {
    console.log("overlay.js loaded");

    $(document).ready( function() {
        $("#loading-overlay").fadeOut( config.transitionDuration );
    })


}

export { overlay };
