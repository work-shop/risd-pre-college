"use strict";

import { toggleClass } from "./toggle-class.js";
import { toggleState } from "./toggle-state.js";
import { jumpLinks } from "./jump-links.js";
import { overlay } from "./overlay.js";

console.log('main.js loaded');

var global_config = {
    headerHeight: 60,
    transitionDuration: 400,
    headerPadding: 30
};

var config = {
    toggleClass: {
        selector: "#sidebar",
        action: "click",
        toggledClass: "open"
    },
    jumpLinks: {
        headerHeight: global_config.headerHeight,
        transitionDuration: global_config.transitionDuration,
        headerPadding: global_config.headerPadding
    },
    overlay: {
        transitionDuration: global_config.transitionDuration
    },
    toggleStateMenu: {
        namespace: "menu",
        transitionDuration: global_config.transitionDuration,
        openCallback: function( elements ) {
            elements.fadeIn( global_config.transitionDuration );
        },
        closedCallback: function( elements ) {
            console.log( elements );
            elements.fadeOut( global_config.transitionDuration );
        }
    },
    toggleStateSidebar: {
        namespace: "sidebar",
        transitionDuration: global_config.transitionDuration
    }
};


toggleClass( config.toggleClass );

toggleState( config.toggleStateMenu );
toggleState( config.toggleStateSidebar );

jumpLinks( config.jumpLinks );
overlay( config.overlay );
