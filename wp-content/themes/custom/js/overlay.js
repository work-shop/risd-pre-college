"use strict";

var ImagesLoaded = require('imagesloaded');
var jQueryBridget = require('jquery-bridget');

function overlay( config ) {
    console.log("overlay.js loaded");

    jQueryBridget("imagesLoaded", ImagesLoaded, $ );

    $(document).ready( function() {
        $(document).imagesLoaded( function() {
            $("#loading-overlay").fadeOut( config.transitionDuration );
        });
    })


}

export { overlay };
