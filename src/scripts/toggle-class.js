"use strict";

function toggleClass( config ) {
    console.log('toggle-class.js loaded');

    $(document).ready( function() {
        $( config.selector ).on( config.action, function() {

            $(this).toggleClass( config.toggledClass );

        });
    });

}

export { toggleClass };
