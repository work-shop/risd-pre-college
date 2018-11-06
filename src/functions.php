<?php

    if (!class_exists("Timber")) {
        add_action("admin_notices", function () {
            echo "<div class='error'><p>Timber is not activated.
            Make sure you activate the plugin in <a href='" .
            esc_url(admin_url("plugins.php#timber")) . "'>" .
            esc_url(admin_url("plugins.php")) . "</a>.</p></div>";
        });
        return;
    }

    $editor_role = get_role("editor");
    $editor_role->add_cap( 'edit_theme_options' );

    Timber::$dirname = "templates";

    class RISDPreCollege extends TimberSite {

        function __construct() {
            add_theme_support("post-formats");
            add_theme_support("menus");

            add_action("init", array($this, "remove_comment_support"));
            add_action("init", array($this, "deactiveate_posts"));
            add_action("init", array($this, "register_image_sizing"));
            add_action("init", array($this, "register_pages_categories"));
            add_action("acf/init", array($this, "add_options_pages"));
            add_action("admin_menu", array($this, "remove_menu_items"));
            add_action("admin_init", array($this, "admin_setup"));
            add_action("wp_dashboard_setup", array($this, "remove_dashboard_widgets") );
            add_action("wp_before_admin_bar_render", array($this, "remove_admin_bar_items"));
            add_action("wp_enqueue_scripts", array($this, "enqueue_scripts"));
            add_action("wp_enqueue_scripts", array($this, "enqueue_styles"));
            add_action('admin_menu', array($this, 'remove_screen_options'));

            add_filter("timber_context", array($this, "add_to_context"));
            add_filter('show_admin_bar', '__return_false');
            add_filter('wp_get_attachment_url', array($this, 'rewrite_cdn_url') );
            add_filter('timber_image_src', array($this, 'rewrite_timber_cdn_url') );
            add_action('pre_get_posts', array($this, 'search_filter'));
            add_filter('request', array($this, 'request_empty_search_filter'));

        }

        public function register_pages_categories() {
            register_taxonomy_for_object_type( 'category', 'page' );
        }

        public function register_image_sizing() {
            if ( function_exists( "add_image_size" ) ) {
                add_image_size("student_work", 1000, 560, false );
                add_image_size("full_bleed", 1920, 1080, false);
                add_image_size("social_card", 600, 600, array( "x_crop_position" => "center", "y_crop_position" => "center"));
            }
        }

        /** add options page to the site. */
        public function add_options_pages() {
            if ( function_exists('acf_add_options_page') ) {
                acf_add_options_page(array(
                    "page_title" => "Home Page",
                    "capability" => "edit_posts",
                    "position" => 5,
                    "icon_url" => "dashicons-admin-home"
                ));
            }
        }

        /** remove comment support for pages and posts. */
        public function remove_comment_support() {
            remove_post_type_support("post", "comments");
            remove_post_type_support("page", "comments");
        }


        // Remove comments link from menu
        public function remove_menu_items() {
            remove_menu_page("edit-comments.php");
            remove_menu_page("edit.php");
        }

        // Remove comments link from admin bar
        public function remove_admin_bar_items() {
            global $wp_admin_bar;
            $wp_admin_bar->remove_menu("comments");
        }

        /** remove admin menu home page widgets */
        public function remove_dashboard_widgets () {
            remove_meta_box("dashboard_primary", "dashboard", "side");   // WordPress.com blog
            remove_meta_box("dashboard_secondary", "dashboard", "side"); // Other WordPress news

            global $wp_meta_boxes;

            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
            unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
            unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
        }

        /** enqueue styles for the front-end */
        public function enqueue_styles() {
            $main = "/styles/bundle.css";

            $magnific_src = "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css";
            wp_enqueue_style("magnific-popup-style", $magnific_src, array());

            $main_src = get_template_directory_uri() . $main;
            $main_ver = filemtime(get_template_directory() . $main);
            wp_enqueue_style("main", $main_src, array("magnific-popup-style"), $main_ver);

        }

        /** enqueue scripts for the front-end */
        public function enqueue_scripts() {
            wp_enqueue_script("jquery");

            $magnific_src = "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js";
            wp_enqueue_script("magnific-popup", $magnific_src, array("jquery"), "1.1.0", true );

            $bundle_src = get_template_directory_uri() . "/scripts/bundle.js";
            $bundle_ver = filemtime(get_template_directory() . "/scripts/bundle.js");
            wp_enqueue_script("bundle", $bundle_src, array("magnific-popup"), $bundle_ver, true);

        }

        public function add_to_context($context) {
            $context["menu"] = new TimberMenu();
            $context["options"] = array(
                "home_page_slideshow" => get_field("home_page_slideshow", "option"),
                "home_page_callout_text" => get_field("home_page_callout_text", "option"),
                "home_page_program_overview_text" => get_field("home_page_program_overview_text", "option"),
                "home_page_info_text" => get_field("home_page_info_text", "option"),
                "applications_are_open" => get_field("applications_are_open", "option"),
                "application_link" => get_field("application_link", "option"),
                "open_applications_footer_text" => get_field("open_applications_footer_text", "option"),
                "closed_applications_footer_text" => get_field("closed_applications_footer_text", "option"),
                "local_telephone_number" => get_field("local_telephone_number", "option"),
                "international_telephone_number" => get_field("international_telephone_number", "option"),
                "instagram_url" => get_field("instagram_url", "option"),
                "facebook_url" => get_field("facebook_url", "option")
             );
            return $context;
        }


        public function request_empty_search_filter( $query_vars ) {
            if ( isset( $_GET['s'] ) && empty( $_GET['s'] ) ) {
                $query_vars['s'] = " ";
            }
            return $query_vars;
        }


        public function search_filter( $query ) {

            $excluded_pages = array(276, 14, 20, 47, 277);

            if ( $query->is_search ) {

                $query->set('post__not_in', $excluded_pages);

            }
        }

        /**
         * Add a custom role without administrative capabilities, but with appearance capabilities.
         *
         *
         */
        public function remove_screen_options() {

            global $submenu;

            $user = wp_get_current_user();

            if ( !in_array( 'administrator', $user->roles ) && isset( $submenu['themes.php'] ) ) {
                foreach ($submenu['themes.php'] as $key => $menu_item ) {
                    if ( in_array('Customize', $menu_item ) ) {
                        unset( $submenu['themes.php'][$key] );
                    }
                    if ( in_array('Themes', $menu_item ) ) {
                        unset( $submenu['themes.php'][$key] );
                    }
                }
            }

        }

        /**
         * Admin setup registers additional settings on the global options page for us.
         *
         * TODO: Need to update the `register_setting` function to take an array in the third parameter – once we're able to update to 4.7.3
         * That API is not available in 4.6.3
         */
        public function admin_setup() {
            register_setting(
                'general',
                'cdn_url'
                );

            add_settings_field(
                'cdn_url',
                'CDN Address (URL)',
                array( $this, 'render_settings_field' ),
                'general',
                'default',
                array( 'cdn_url', get_option('cdn_url') )
                );
        }

        /**
         * Callback function to render the CDN URL field in the options.
         *
         * @param $args array the array of value arguments
         *
         */
        public function render_settings_field( $args ) {
            echo "<input aria-describedby='cdn-description' name='cdn_url' class='regular-text code' type='text' id='" . $args[0] . "' value='" . $args[1] . "'/>";
            echo "<p id='cdn-description' class='description'>Input the url of the CDN to use with this site or leave this field blank to bypass the CDN.";
        }

        /**
         * Rewrite attachment URL from the base CMS form to the desired CDN form.
         *
         * @filter 'wp_get_attachment_url'
         * @param $original string the original attachment URL
         * @return String the updated CDN url.
         */
        public function rewrite_cdn_url( $original ) {

            $trailing_string = '/wp-content/uploads/';
            $cms_url =  get_option( 'siteurl' );
            $cdn_url = get_option('cdn_url');


            if ( ! empty( $cdn_url ) ) {

                return str_replace( $cms_url . $trailing_string, $cdn_url . '/', $original );

            } else {

                return $original;

            }

        }

        /**
         * Rewrite attachment URL from the base CMS form to the desired CDN form.
         *
         * @filter 'timber_image_src'
         * @param $original string the original attachment URL
         * @return String the updated CDN url.
         */
        public function rewrite_timber_cdn_url( $src, $ID ) {

            $size = '';
            $attachement_src = wp_get_attachment_image_src( $ID, $size )[0];
            $fixed_src = $attachement_src ? $attachement_src : $src;
            return $fixed_src;

        }



    }

    new RISDPreCollege();
