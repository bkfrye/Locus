<?php

include get_template_directory() . '/inc/custom-post-types.php';

function locus_resources()
{

	// wp_enqueue_style( 'slick-carousel', get_template_directory_uri() . '/slick-carousel.css', null, false, false );
	wp_enqueue_style('style', get_stylesheet_uri(), array(), filemtime(get_theme_file_path('/style.css')), false);
	wp_enqueue_script('header_js', get_template_directory_uri() . '/js/header-bundle.js', array('jquery'), false, false);
}

add_action('wp_enqueue_scripts', 'locus_resources');

// remove wp version number from scripts and styles
// function remove_css_js_version( $src ) {
//   if( strpos( $src, '?ver=' ) )
//       $src = remove_query_arg( 'ver', $src );
//   return $src;
// }
// // add_filter( 'style_loader_src', 'remove_css_js_version', 9999 );
// add_filter( 'script_loader_src', 'remove_css_js_version', 9999 );

// function custom_excerpt_length()
// {
// 	return 22;
// }

// add_filter('excerpt_length', 'custom_excerpt_length');

function locus_setup()
{
	add_theme_support('title-tag');

	add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'locus_setup');

show_admin_bar(false);

// function is_search_has_results()
// {
// 	return 0 != $GLOBALS['wp_query']->found_posts;
// }

// function locus_widgets()
// {
// 	register_sidebar(
// 		[
// 			'name' => 'Sidebar',
// 			'id' => 'sidebar1',
// 			'before_widget' => '<div class="widget-item">',
// 			'after_widget' => '</div>',
// 			'before_title' => '<h2 class="widget-title">',
// 			'after_title' => '</h2>',
// 		]
// 	);
// }

// add_action('widgets_init', 'locus_widgets');

/**
 * Register Theme menus function
 *
 */
function theme_menus() {
	register_nav_menus( array(
		'main-menu' => __( 'Main Menu' ),
    'secondary-menu' => __( 'Secondary Menu' ),
	) );
}
add_action( 'init', 'theme_menus' );

/**
 * Remove unneeded admin menu items
 *
 */
function custom_menu_page_removing() {
  remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'custom_menu_page_removing' );


/**
 * Turn off Gutenberg Editor
 *
 */
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

add_image_size( 'device', 640, 9999 );
add_image_size( 'standard', 1080, 9999 );
add_image_size( 'desktop', 1440, 9999 );
add_image_size( 'large', 2880, 9999 );

// Register useful image sizes for use in Add Media modal
add_filter( 'image_size_names_choose', 'wpshout_custom_sizes' );
function wpshout_custom_sizes( $sizes ) {
  return array_merge( $sizes, array(
    'device' => __( 'Device' ),
    'standard' => __( 'Standard' ),
    'desktop' => __( 'Desktop' ),
    'large' => __( 'Large' ),
  ) );
}


/**
 * Modify WP default max srcset size
 */
add_filter( 'max_srcset_image_width', 'max_srcset_image_width', 10 , 2 );
function max_srcset_image_width() {
	return 2880;
}



/**
 * Anchor linking helper function
 */
function convertToAnchor($string) {
  $string = strtolower($string);
  $string = preg_replace("/[\s_]/", "-", $string);
  return $string;
}



// function getEmployeeDetails( $id, $post_type_name ) {
//   $args = array('p' => $id, 'post_type' => $post_type_name);
//   $loop = new WP_Query($args);
//   while ( $loop->have_posts() ) : $loop->the_post();
//     global $post;
//     the_title('<h3>','</h3>');
//     the_field('role');
//     the_field('biography');
//   endwhile;
// }


function blog_scripts() {
    // Register the script
    wp_register_script( 'custom-script', get_stylesheet_directory_uri(). '/js/footer-bundle.js', array('jquery'), false, true );

    // Localize the script with new data
    $script_data_array = array(
      'ajaxurl' => admin_url( 'admin-ajax.php' ),
      'security' => wp_create_nonce( 'load_more_posts' ),
      'id' => null,
      'type' => null,
    );
    wp_localize_script( 'custom-script', 'employee', $script_data_array );

    // Enqueued script with localized data.
    wp_enqueue_script( 'custom-script' );
}
add_action( 'wp_enqueue_scripts', 'blog_scripts' );


// cron type script idea 
// https://wordpress.stackexchange.com/questions/363234/check-if-checkbox-is-marked-on-publish-update-post