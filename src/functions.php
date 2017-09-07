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

    require_once(get_template_directory() . "/routes.php");

    Timber::$dirname = "templates";

    class RISDPreCollege extends TimberSite {
        function __construct() {
            add_theme_support("post-formats");
            add_theme_support("menus");

            add_action("init", array($this, "remove_comment_support"));
            add_action("init", array($this, "deactiveate_posts"));
            add_action("acf/init", array($this, "add_options_pages"));
            add_action("admin_menu", array($this, "remove_menu_items"));
            add_action("wp_before_admin_bar_render", array($this, "remove_admin_bar_items"));
            add_action("wp_enqueue_scripts", array($this, "enqueue_scripts"));
            add_action("wp_enqueue_scripts", array($this, "enqueue_styles"));

            add_filter("timber_context", array($this, "add_to_context"));

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
        }

        /** enqueue styles for the front-end */
        public function enqueue_styles() {
            $main = "/styles/bundle.css";

            $main_src = get_template_directory_uri() . $main;
            $main_ver = filemtime(get_template_directory() . $main);
            wp_enqueue_style("main", $main_src, array("base"), $main_ver);

        }

        /** enqueue scripts for the front-end */
        public function enqueue_scripts() {
            wp_enqueue_script("jquery");

            $bundle_src = get_template_directory_uri() . "/scripts/bundle.js";
            $bundle_ver = filemtime(get_template_directory() . "/scripts/bundle.js");
            wp_enqueue_script("bundle", $bundle_src, array("jquery"), $bundle_ver, true);
        }

        public function add_to_context($context) {
            $context["menu"] = new TimberMenu();

        }

    }

    new RISDPreCollege();
