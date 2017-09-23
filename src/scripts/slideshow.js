"use strict";

require('flexslider');
var tinycolor = require('tinycolor2');

function slideshow( config ) {
    console.log('slideshow.js loaded.')
    $(document).ready( function() {

        console.log( config );

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

            keyboard: true,

            start: function( slider ) {

                colorNavElements( slider, slider.currentSlide );

            },
            before: function( slider ) {

                colorNavElements( slider, slider.getTarget( 'next' ) );

            },
        });
    });
}

function colorNavElements( slider, index ) {
    var targetColor = tinycolor( $(slider.slides[ index ]).data('overlay-box-color') );
    var hoverColor = tinycolor( $(slider.slides[ index ]).data('overlay-box-color') ).darken( 10 );

    $('.pre-college-overlay-box').css({'background-color': targetColor.toHexString()   });

    $('path.logo-aperture').css({'fill': targetColor.toHexString() });


    $('.home-page-nav-prev').css({'color': targetColor.toHexString() });
    $('.home-page-nav-prev a').mouseover(function() { console.log('hover'); $(this).css({'color': hoverColor.toHexString() }); });
    $('.home-page-nav-prev a').mouseout(function() { console.log('hover'); $(this).css({'color': targetColor.toHexString() }); });

    $('.home-page-nav-next').css({'color': targetColor.toHexString() });
    $('.home-page-nav-next a').mouseover(function() { $(this).css({'color': hoverColor.toHexString() }); });
    $('.home-page-nav-next a').mouseout(function() { $(this).css({'color': targetColor.toHexString() }); });

    $('.apply-button').css({'background-color': targetColor.toHexString() });
    $('.apply-button').mouseover(function() { $(this).css({'background-color': hoverColor.toHexString() }); });
    $('.apply-button').mouseout(function() { $(this).css({'background-color': targetColor.toHexString() }); });

}

export { slideshow };
