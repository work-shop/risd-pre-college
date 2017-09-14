"use strict";

function jumpLinks( config ) {
    console.log("jump-links.js loaded");

    $(document).ready( function() {
        $("a[href^='#']").on("click", function() {
            console.log("clicked");
            $("html,body").animate({"scrollTop": $( $(this).attr("href") ).offset().top - config.headerHeight - config.headerPadding }, config.transitionDuration );
        });
    });

}

export { jumpLinks };
