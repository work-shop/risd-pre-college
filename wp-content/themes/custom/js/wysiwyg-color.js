"use strict";

var tinycolor = require('tinycolor2');

function wysiwyg_color( config ) {
    console.log( 'wysiwyg-color.js loaded' );

    $( document ).ready( function() {
        $( config.selector ).each( function( ) {
            $(this).css({ color: tinycolor( $(this).data('text-color') ).darken( config.darken ) });
            $(this).find('strong, b').css({ color: tinycolor( $(this).data('text-color') ).lighten( config.lighten ) });
        })
    });
}

export { wysiwyg_color };
