"use strict";


function getCachedData( metric ) {

    var value = metric();
    $(window).resize( function() { value = metric(); });

    return function() { return value };
}

function scrollDeltaYMeasure() {
    var previousScrollTop = $(window).scrollTop();
    return function() {
        var currentScrollTop = $(window).scrollTop();
        var dy = currentScrollTop - previousScrollTop;
        previousScrollTop = currentScrollTop;
        return dy;
    };
}

function sidebar( config ) {
    console.log('sidebar-second.js loaded');

    var contentBottomMetric = function() { return ($(config.sidebarContentSelector).offset().top - $(window).scrollTop()) + $(config.sidebarContentSelector).height() + config.footerTopPadding; };

    var footerTopMetric = function() { return $( config.footerSelector ).offset().top };

    var getSidebarContentHeight = getCachedData( contentBottomMetric );

    var getFooterTop = getCachedData( footerTopMetric );

    var getScrollDeltaY = scrollDeltaYMeasure();

    function getWindowTopOffset( ) { return $(window).scrollTop(); }


    $( document ).ready( function() {

        $( window ).on("scroll", function() {

            var offset = 0;

            if ( (getSidebarContentHeight() + getWindowTopOffset()) > getFooterTop() ) {


                $( config.sidebarSelector ).css( { top: offset } );

            } else {

                $( config.sidebarSelector ).css( { top: 0 } );


            }

        });



        console.log('Sidebar Height:');
        console.log( getSidebarContentHeight( ) );
        console.log('Window ScrollTop:');
        console.log( getWindowTopOffset( ) );




    });
}



export { sidebar };
