<?php

    global $params;

    $context = Timber::get_context();
    $post = Timber::get_post( get_the_ID() );

    if ( isset($params["posts"]) ) {
        $context["posts"] = $params["posts"];
    } else {
        unset( $context["posts"] );
    }

    $context["post"] = $post;

    $templates = array( "page-$post->post_name.twig", "page.twig" );

    Timber::render( $templates, $context );

?>
