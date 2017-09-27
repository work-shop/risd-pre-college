"use strict";

import { toggleClass } from "./toggle-class.js";
import { toggleState } from "./toggle-state.js";
import { jumpLinks } from "./jump-links.js";
import { overlay } from "./overlay.js";
import { collapsibleSubsections } from "./collapsible-subsections.js";
import { orientation } from "./orientation.js";
import { slideshow } from "./slideshow.js";
import { student_work_grid } from "./student-work-grid.js";

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
            elements.fadeOut( global_config.transitionDuration );
        }
    },
    toggleStateSearch: {
        namespace: "search",
        transitionDuration: global_config.transitionDuration,
        clearAllOthers: true,
        openCallback: function( elements ) {
            elements.fadeIn( global_config.transitionDuration );
        },
        closedCallback: function( elements ) {
            elements.fadeOut( global_config.transitionDuration );
        }
    },
    toggleStateSidebar: {
        namespace: "sidebar",
        transitionDuration: global_config.transitionDuration,
        clearAllOthers: false
    },
    collapsibleSubsections: {
        transitionDuration: global_config.transitionDuration,
        clearAllOthers: false
    },
    slideshow: {
        transitionDuration: 1500,
        slideDuration: 7000,
        namespace: "home-page-"
    },
    student_work_grid: {

    }
};


toggleClass( config.toggleClass );

toggleState( config.toggleStateMenu );
toggleState( config.toggleStateSearch );
toggleState( config.toggleStateSidebar );
jumpLinks( config.jumpLinks );
overlay( config.overlay );

slideshow( config.slideshow );
student_work_grid( config.student_work_grid );

collapsibleSubsections( config.collapsibleSubsections );




//orientation( {selector: '.slide'} );
