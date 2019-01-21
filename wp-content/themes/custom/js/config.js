var global_config = {
    headerHeight: 60,
    transitionDuration: 400,
    headerPadding: 24
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
        clearAllOthers: true,
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
        condition: function() {
            return ['xs', 'sm'].indexOf( $("body").data('active-breakpoint') ) !== -1;
        },
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
    studentWorkGrid: {

    },
    breakpoints: {
        // these are min-widths for these breakpoints.
        breakpoints: {
            xs: -Infinity,
            sm: 575,
            md: 767,
            lg: 991,
            xl: 1199
        }
    },
    sidebar: {
        sidebarContentSelector: ".sidebar-content",
        sidebarSelector: "#sidebar",
        footerSelector: "footer",
        footerTopPadding: 50
    },
    home_page_wysiwyg: {
        darken: 27,
        lighten: 35,
        selector: '.home-wysiwyg'
    }
};

export { config };
