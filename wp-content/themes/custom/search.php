<?php
/**
 * Template Name: Search Page
 */
global $query_string;

wp_parse_str( $query_string, $parameters );

$parameters["post_type"] = array("page");
$parameters["posts_per_page"] = -1;

$context = Timber::get_context();
$posts = Timber::get_posts( $parameters );

$context['query'] = $parameters['s'];
$context['results'] = $posts;

Timber::render( array('search.twig'), $context );

?>
