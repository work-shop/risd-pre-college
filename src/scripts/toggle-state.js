"use strict";

function toggleState( config ) {
    console.log('toggle-state.js loaded');

    config.openCallback = config.openCallback || function() {};
    config.closedCallback = config.closedCallback || function() {};


    function namespaceClassName( transitionLabel ) {
        return [config.namespace, "-", transitionLabel ].join("");
    }

    function namespaceClassSelector( transitionLabel ) {
        return [".", namespaceClassName( transitionLabel ) ].join("");
    }

    $(document).ready( function() {
        $( namespaceClassSelector("toggle") ).on("click", function() {
            $( namespaceClassSelector("toggle-target") + ", " + namespaceClassSelector("toggle") )
                .toggleClass( namespaceClassName("closed") )
                .toggleClass( namespaceClassName("open") );

            config.openCallback( $( namespaceClassSelector("toggle-target")+namespaceClassSelector("open") ).filter( ":not(html,body)" ) );

            config.closedCallback( $( namespaceClassSelector("toggle-target")+namespaceClassSelector("closed") ).filter( ":not(html,body)" ) );

            $( "html,body" )
                .toggleClass( namespaceClassName("closed") )
                .toggleClass( namespaceClassName("open") );

        });
    });

};


export { toggleState };
