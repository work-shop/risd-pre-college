"use strict";

import { toggleState } from "./toggle-state.js";

function collapsibleSubsections( config ) {
    $( document ).ready( function() {
        $('.subsection').each( function( i ) {

            toggleState({
                namespace: $(this).data('toggle-namespace'),
                clearAllOthers: config.clearAllOthers || false,
                openCallback: function( elements, buttons ) {
                    elements.slideDown( config.transitionDuration );
                    buttons.addClass("subsection-open");
                    buttons.removeClass("subsection-closed");
                },
                closedCallback: function( elements, buttons ) {
                    elements.slideUp( config.transitionDuration );
                    buttons.removeClass("subsection-open");
                    buttons.addClass("subsection-closed");
                }
            });

        })


    });
}

export { collapsibleSubsections };
