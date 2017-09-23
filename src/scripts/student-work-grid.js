"use strict";

var jQueryBridget = require('jquery-bridget');
var Packery = require('packery');
var ImagesLoaded = require('imagesloaded');

function student_work_grid( config ) {
    console.log('student-work-grid.js loaded');

    jQueryBridget( 'packery', Packery, $ );
    jQueryBridget('imagesLoaded', ImagesLoaded, $ );

    var student_work_selector = '.student-work-image-item';

    $( document ).ready( function() {

        $('.student-work-images').imagesLoaded( function() {
            $('.student-work-images').packery({
                itemSelector: student_work_selector,
                gutter:0
            });

            $( student_work_selector ).on('click', function() {
                var meta = $(this).find('.student-work-meta')
                meta.fadeIn( 450 );
                meta.on('click', function( e ) { e.stopPropagation(); meta.fadeOut( 250 ); });

            });
        });

    });
}

export { student_work_grid };
