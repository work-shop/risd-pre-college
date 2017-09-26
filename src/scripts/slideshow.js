"use strict";

/** Flexslider library for setting up slideshow. */
require('flexslider');

/** Tinycolor for doing operations on color strings. */
var tinycolor = require('tinycolor2');

function slideshow( config ) {
    console.log('slideshow.js loaded.');

    var state = {
        hoveringPrev: false,
        hoveringNext: false
    };

    $(document).ready( function() {

        $('.flexslider').flexslider({
            namespace: config.namespace || "",
            selector: config.selector || '.slide',
            animation: config.animation || 'fade',
            easing: "swing",
            direction: "horizontal",
            animationLoop: true,
            startAt: 0,
            slideshow: true,
            controlNav: false,
            slideshowSpeed: config.slideDuration || 7000,
            animationSpeed: config.transitionDuration || 450,
            initDelay: config.delay || 0,
            randomize: false,
            prevText: "<",
            nextText: ">",
            pauseOnAction: false,

            keyboard: true,

            start: function( slider ) {

                colorNavElements( slider, slider.currentSlide, state );

            },
            before: function( slider ) {

                colorNavElements( slider, slider.getTarget( 'next' ), state );

            },
        });
    });
}

function colorNavElements( slider, index, state ) {
    var targetColor = tinycolor( $(slider.slides[ index ]).data('overlay-box-color') );
    var hoverColor = tinycolor( $(slider.slides[ index ]).data('overlay-box-color') ).darken( 10 );

    $('.pre-college-overlay-box').css({'background-color': targetColor.toHexString()   });

    $('path.logo-aperture').css({'fill': targetColor.toHexString() });

    $('.home-page-nav-prev a').css({'color': ( state.hoveringPrev ) ? hoverColor.toHexString() : targetColor.toHexString() });

    $('.home-page-nav-prev a').mouseover(function() {
        state.hoveringPrev = true;
        $(this).css({'color': hoverColor.toHexString() });
    });

    $('.home-page-nav-prev a').mouseout(function() {
        state.hoveringPrev = false;
        $(this).css({'color': targetColor.toHexString() });
    });

    $('.home-page-nav-next a').css({'color': ( state.hoveringNext ) ? hoverColor.toHexString() : targetColor.toHexString() });
    $('.home-page-nav-next a').mouseover(function() {
        state.hoveringNext = true;
        $(this).css({'color': hoverColor.toHexString() });
    });
    $('.home-page-nav-next a').mouseout(function() {
        state.hoveringNext = false;
        $(this).css({'color': targetColor.toHexString() });
    });

    $('.apply-button').css({'background-color': targetColor.toHexString() });
    $('.apply-button').mouseover(function() { $(this).css({'background-color': hoverColor.toHexString() }); });
    $('.apply-button').mouseout(function() { $(this).css({'background-color': targetColor.toHexString() }); });

}

export { slideshow };
