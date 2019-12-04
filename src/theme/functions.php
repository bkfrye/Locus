<?php
/**
 * Enqueue Locus Scripts and Styles
 *
 */
function locus_resources() {
  wp_enqueue_style( 'fonts', get_template_directory_uri() . '/fonts.css', null, false, false );
	wp_enqueue_style( 'style', get_stylesheet_uri(), null, false, false );
	wp_enqueue_script( 'header_js', get_template_directory_uri() . '/js/header-bundle.js', array(), false, true );
	wp_enqueue_script( 'footer_js', get_template_directory_uri() . '/js/footer-bundle.js', array(), false, true );
}
add_action( 'wp_enqueue_scripts', 'locus_resources' );




/**
 * Prevent version number from being
 * appended to scripts and styles
 */
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


/**
 * Add WP Features function
 *
 */
// Theme setup
function locus_setup() {
  // Add editor styles for dashboard content
  add_editor_style('editor-style.css');
	// Handle Titles
	add_theme_support( 'title-tag' );
	// Add featured image support
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'locus_setup' );


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


/**
 * Include Themes Options page through ACF
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Locus Theme Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}


function getMetaData($url) {
  $tags = get_meta_tags($url);

  echo '<div class="news-card">';
    echo '<div class="news-card-image">';
        echo '<div class="news-card-image">';
            if ( $tags['twitter:image:src'] ) :
                echo '<img src="' . $tags['twitter:image:src'] . '" alt="' . $tags['twitter:title'] . '">';
            else:
                echo '<img src="' . $tags['twitter:image'] . '" alt="' . $tags['twitter:title'] . '">';
            endif;
        echo '</div>';
    echo '</div>';

    if ( $tags['twitter:title'] ) :
      echo '<div class="news-card-content">';
        echo '<h3>' . $tags['twitter:title'] . '</h3>';
        echo '<p>' . $tags['twitter:description'] . '</p>';
      echo '</div>';
    else :
      echo '<div class="news-card-content">';
        echo '<h3>' . $tags['og:title'] . '</h3>';
        echo '<p>' . $tags['og:description'] . '</p>';
      echo '</div>';
    endif;
  echo '</div>';
}