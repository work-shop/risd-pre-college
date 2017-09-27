"use strict";

import { toggleState } from "./toggle-state.js";

function breakpoints( config ) {

    var breaks = buildBreakpointList( config.breakpoints );

    $(document).ready( function() {

        var previousWidth = window.innerWidth;
        var previousBreak = determineCurrentBreakpoint( breaks )

        $('body').attr('data-active-breakpoint', previousBreak.name );

        $( window ).resize( function( e ) {

            previousBreak = determineCurrentBreakpoint( breaks, previousBreak.index,  Math.sign(window.innerWidth, previousWidth) );
            previousWidth = window.innerWidth;

            $('body').attr('data-active-breakpoint', previousBreak.name );
        })

    });
}

/**
 * Given an object containing breakpoint names mapped to their min-widths,
 * constructs a list of breakpoints for internal use. This module assumes each breakpoint i
 * covers up to (i + 1) - 1 pixels. In other words, it assumes a contiguous, non-overlapping cover
 * of the page.
 *
 * @param breakpoints an object { .., break-name: n, <int>, ... }
 * @return a list [.., {name: break-name, width: n <int>}, ...]
 */
function buildBreakpointList( breakpoints ) {
    var list = [];

    for ( var breakpoint in breakpoints ) {
        if ( breakpoints.hasOwnProperty( breakpoint ) ) {
            list.push({ name: breakpoint, width: breakpoints[ breakpoint ] } );
        }
    }

    return list.sort( function( a,b ) { return a.width - b.width; });
}

/**
 * given breakpoint list, starting index, and a direction of resize,
 * selects the current breakpoint size based on the window's width;
 *
 */
function determineCurrentBreakpoint( breaks, s, dx ) {

    dx = dx || 1;
    s = (dx > 0) ? breaks.length - 1 : 0;

    var match_width = window.innerWidth;
    var breakpoint = null;

    for ( var i = s; i < breaks.length; i -= dx ) {
        var width_lower_bound = (typeof breaks[ i ] !== "undefined") ? breaks[ i ].width : -Infinity;
        var width_upper_bound = (typeof breaks[ i + 1 ] !== "undefined") ? breaks[ i + 1 ].width : Infinity;

        if ( match_width >= width_lower_bound && match_width < width_upper_bound ) {
            breakpoint = {name: breaks[ i ].name, index: i};
            break;
        }

    }

    return breakpoint;

    return ( breakpoint !== null ) ? breakpoint : determineCurrentBreakpoint( breaks );
}

export { breakpoints };
