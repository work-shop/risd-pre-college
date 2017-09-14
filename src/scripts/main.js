"use strict";

import { toggleClass } from "./toggle-class.js";
import { jumpLinks } from "./jump-links.js";
import { overlay } from "./overlay.js";

console.log('main.js loaded');

var global_config = {
    headerHeight: 60,
    transitionDuration: 350,
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
    }
};


toggleClass( config.toggleClass );
jumpLinks( config.jumpLinks );
overlay( config.overlay );
