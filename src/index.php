<?php

$context = Timber::get_context();
$context["posts"] = Timber::get_posts();

Timber::render( 'home.twig', $context );

?>
