<?php

    global $params;

    $context = Timber::get_context();
    $post = Timber::get_post( get_the_ID() );
    $parent = Timber::get_post( $post->post_parent );

    if ( isset($params["posts"]) ) {
        $context["posts"] = $params["posts"];
    } else {
        unset( $context["posts"] );
    }

    $context["post"] = $post;
    $context["parent"] = ($parent) ? $parent : $post;

    $templates = array( "page-$post->post_name.twig", "page.twig" );

    Timber::render( $templates, $context );

?>
