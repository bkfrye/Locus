<?php
function wordpressify_resources() {
  wp_enqueue_style( 'video-style', 'https://vjs.zencdn.net/7.3.0/video-js.css', null, '', false );
  wp_enqueue_style( 'fonts', get_template_directory_uri() . '/fonts.css', null, '', false );
	wp_enqueue_style( 'style', get_stylesheet_uri() );
	wp_enqueue_script( 'header_js', get_template_directory_uri() . '/js/header-bundle.js', null, '', false );
	wp_enqueue_script( 'footer_js', get_template_directory_uri() . '/js/footer-bundle.js', null, '', true );
}

add_action( 'wp_enqueue_scripts', 'wordpressify_resources' );

// Theme setup
function wordpressify_setup() {

  add_editor_style('editor-style.css');
	// Handle Titles
	add_theme_support( 'title-tag' );

	// Add featured image support
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'team_member', 250, 250, true );
}

add_action( 'after_setup_theme', 'wordpressify_setup' );

// show_admin_bar( true );

// Checks if there are any posts in the results
function is_search_has_results() {
	return 0 != $GLOBALS['wp_query']->found_posts;
}


function theme_menus() {
	register_nav_menus( array(
		'main-menu' => __( 'Main Menu' ),
    'secondary-menu' => __( 'Secondary Menu' ),
	) );
}
add_action( 'init', 'theme_menus' );


function custom_menu_page_removing() {
  remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'custom_menu_page_removing' );


add_filter('use_block_editor_for_post', '__return_false');



