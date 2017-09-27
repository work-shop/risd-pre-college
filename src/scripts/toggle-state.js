"use strict";

function toggleState( config ) {
    console.log('toggle-state.js loaded');

    /** add sensible no-op defaults to the callbacks */
    config.openCallback = config.openCallback || function() {};
    config.closedCallback = config.closedCallback || function() {};
    config.condition = config.condition || function() { return true; }

    /**
     * Builds a sensible namespaced transitionlabel out of a specified namespace.
     *
     * @param transitionLabel a label for the state that this class represents.
     * @param namespace override the speicified namespace in config, if need be.
     * @return String a classname for a given namespace.
     */
    function namespaceClassName( transitionLabel, namespace ) {
        return [namespace || config.namespace, "-", transitionLabel ].join("");
    }

    /**
     * uses namespaceClassName to build a valid class name for a selector.
     */
    function namespaceClassSelector( transitionLabel, namespace ) {
        return [".", namespaceClassName( transitionLabel, namespace ) ].join("");
    }

    $(document).ready( function() {
        if ( config.clearAllOthers ) {
            $( namespaceClassSelector("toggle-target") ).addClass('toggle-target').attr('data-toggle-namespace', config.namespace );
            $( namespaceClassSelector("toggle") ).addClass('toggle').attr('data-toggle-namespace', config.namespace );
        }

        $( namespaceClassSelector("toggle") ).on("click", function() {

            if ( config.condition() ) {

                if ( config.clearAllOthers ) {
                    $('.toggle-target').filter(':not('+namespaceClassSelector("toggle-target")+')').each(
                        function() {
                            config.closedCallback( $(this), $(this)  );
                            $(this).removeClass( namespaceClassName( 'open', $(this).data('toggle-namespace') ) );
                            $(this).addClass( namespaceClassName( 'closed', $(this).data('toggle-namespace') ) );

                            $("html,body").removeClass( namespaceClassName( 'open', $(this).data('toggle-namespace') ) );
                            $("html,body").addClass( namespaceClassName( 'closed', $(this).data('toggle-namespace') ) );

                        });

                    $('.toggle').filter(':not('+namespaceClassSelector("toggle")+')').each(
                        function() {
                            $(this).removeClass( namespaceClassName( 'open', $(this).data('toggle-namespace') ) );
                            $(this).addClass( namespaceClassName( 'closed', $(this).data('toggle-namespace') ) );
                        });
                }

                $( namespaceClassSelector("toggle-target") + ", " + namespaceClassSelector("toggle") )
                    .toggleClass( namespaceClassName("closed") )
                    .toggleClass( namespaceClassName("open") );

                config.openCallback( $( namespaceClassSelector("toggle-target")+namespaceClassSelector("open") ).filter( ":not(html,body)" ), $( namespaceClassSelector("toggle")+namespaceClassSelector("open") ).filter( ":not(html,body)" ) );

                config.closedCallback( $( namespaceClassSelector("toggle-target")+namespaceClassSelector("closed") ).filter( ":not(html,body)" ), $( namespaceClassSelector("toggle")+namespaceClassSelector("closed") ).filter( ":not(html,body)" ) );

                $( "html,body" )
                    .toggleClass( namespaceClassName("closed") )
                    .toggleClass( namespaceClassName("open") );

            }

        });
    });

};


export { toggleState };
