<?php
function wordpressify_resources() {
  wp_enqueue_style( 'video-style', 'https://vjs.zencdn.net/7.3.0/video-js.css', null, false, false );
  wp_enqueue_style( 'fonts', get_template_directory_uri() . '/fonts.css', null, false, false );
	wp_enqueue_style( 'style', get_stylesheet_uri(), null, false, false );
  wp_enqueue_script( 'scroll-reveal', 'https://unpkg.com/scrollreveal@4.0.5/dist/scrollreveal.js', null, false, true );
	wp_enqueue_script( 'header_js', get_template_directory_uri() . '/js/header-bundle.js', null, false, true );
	wp_enqueue_script( 'footer_js', get_template_directory_uri() . '/js/footer-bundle.js', null, false, true );
}
add_action( 'wp_enqueue_scripts', 'wordpressify_resources' );

// remove version from head
remove_action('wp_head', 'wp_generator');
// remove version from rss
add_filter('the_generator', '__return_empty_string');
// remove version from scripts and styles
function remove_version_scripts_styles($src) {
	if (strpos($src, 'ver=')) {
		$src = remove_query_arg('ver', $src);
	}
	return $src;
}
add_filter('style_loader_src', 'remove_version_scripts_styles', 9999);
add_filter('script_loader_src', 'remove_version_scripts_styles', 9999);

// Theme setup
function wordpressify_setup() {
  add_editor_style('editor-style.css');
	// Handle Titles
	add_theme_support( 'title-tag' );
	// Add featured image support
	add_theme_support( 'post-thumbnails' );
}

add_action( 'after_setup_theme', 'wordpressify_setup' );




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


/**
 * Responsive Image Helper Function
 *
 * @param string $image_id the id of the image (from ACF or similar)
 * @param string $image_size the size of the thumbnail image or custom image size
 * @param string $max_width the max width this image will be shown to build the sizes attribute
 */

function responsive_image( $image_id, $image_size, $max_width ) {
	if($image_id != '') {
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );
		echo 'src="'.$image_src.'" srcset="'.$image_srcset.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"';
	}
}


/**
 * Modify WP default max srcset size
 */
add_filter( 'max_srcset_image_width', 'max_srcset_image_width', 10 , 2 );
function max_srcset_image_width() {
	return 2880;
}




function convertToAnchor($string) {
  $string = strtolower($string);
  $string = preg_replace("/[\s_]/", "-", $string);
  return $string;
}


if( function_exists('acf_add_options_page') ) {

	acf_add_options_page(array(
		'page_title' 	=> 'Locus Theme Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}




