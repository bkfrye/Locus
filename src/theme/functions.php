<?php
function wordpressify_resources() {
  wp_enqueue_style( 'video-style', 'https://vjs.zencdn.net/7.3.0/video-js.css', null, '', false );
  wp_enqueue_style( 'fonts', get_template_directory_uri() . '/fonts.css', null, '', false );
	wp_enqueue_style( 'style', get_stylesheet_uri() );

  wp_enqueue_script( 'scroll-reveal', 'https://unpkg.com/scrollreveal', null, '', false );
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
}

add_action( 'after_setup_theme', 'wordpressify_setup' );


// add_filter( 'wp_title', 'customize_title_tag', 10, 3 );
// function customize_title_tag( $title, $sep, $seplocation ) {
//   $title = str_replace( '|', '-', $title );
//   return $title;
// }

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



