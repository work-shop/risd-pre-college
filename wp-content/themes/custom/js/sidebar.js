"use strict";

function sidebar( config ) {
    console.log('sidebar.js loaded');

    $( document ).ready( function() {

        var sidebarContent = $( config.selector );

        function getContentBottom() { return sidebarContent.offset().top + sidebarContent.height() + config.footerTopPadding; }
        function getFooterTop() { return $( config.footerSelector ).offset().top; }
        var getScrollDeltaY = scrollDeltaYMeasure();

        var footerTop = getFooterTop();
        var currentBottom = getContentBottom();
        var contentUnfixedPosition = $( config.sidebarSelector ).offset().top;

        var testElement = $('<div>').attr('id', 'debug').css({
            width:1,
            height:1,
            position: "absolute",
            top: currentBottom
        });

        $("html").append( testElement );

        $(window).resize( function() {
            footerTop = getFooterTop();
            sidebarContent = $( config.selector );
        });

        $(document).on( "scroll", function( e ) {

            var relativeOffset = 0;

            if ( footerTop <= currentBottom ) {

                var dy = getScrollDeltaY();

                currentBottom += dy;
                $( config.sidebarSelector ).addClass('sidebar-unfixed');
                $( config.sidebarSelector ).css({position:"absolute", bottom: -($("footer").height()) });
                testElement.css({top: currentBottom });


            } else {

                getScrollDeltaY();

                currentBottom = getContentBottom()
                $( config.sidebarSelector ).removeClass('sidebar-unfixed');
                $( config.sidebarSelector ).css({position:"fixed", bottom: 0});
                testElement.css({top: currentBottom })

            }

        })

    });
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

export { sidebar };
