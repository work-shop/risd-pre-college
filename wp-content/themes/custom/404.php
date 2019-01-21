<?php
/**
 * Template Name: Page 404
 */

$student_work_ID = 29;
$context = Timber::get_context();
$student_work = get_field( 'student_work_images', $student_work_ID );

$context['error_image'] = $student_work[ array_rand( $student_work ) ];

Timber::render( array('404.twig'), $context );

?>
