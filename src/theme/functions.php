<?php

include get_template_directory() . '/inc/custom-post-types.php';


/**
 * Enqueue Locus Scripts and Styles
 *
 */
function locus_resources() {
  wp_enqueue_style( 'fonts', get_template_directory_uri() . '/fonts.css', null, false, false );
	wp_enqueue_style( 'style', get_stylesheet_uri(), null, false, false );
	wp_enqueue_script( 'header_js', get_template_directory_uri() . '/js/header-bundle.js', array('jquery'), false, true );
  // wp_enqueue_script( 'footer_js', get_template_directory_uri() . '/js/footer-bundle.js', array('jquery'), false, true );
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


// @ini_set( 'upload_max_size' , '64M' );
// @ini_set( 'post_max_size', '64M');
// @ini_set( 'max_execution_time', '300' );

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




add_action('wp_ajax_load_posts_by_ajax', 'load_posts_by_ajax_callback');
add_action('wp_ajax_nopriv_load_posts_by_ajax', 'load_posts_by_ajax_callback');

function load_posts_by_ajax_callback() {
  check_ajax_referer('load_more_posts', 'security', 'id', 'type');
  $id = $_POST['id'];
  $type = $_POST['type'];
  $args = array(
    'p' => strval($id),
    'post_type' => strval($type),
    'post_status' => 'publish',
    'posts_per_page' => '1',
  );
  $posts = new WP_Query( $args );

  if ( $posts->have_posts() ) :
    while ( $posts->have_posts() ) : $posts->the_post(); ?>
      <div class="employee-bio-panel">
        <div class="employee-bio-wrapper">
          <header class="employee-bio">
            <div class="employee-image">
              <?php
                $image = get_field('profile_image');
                $size = 'medium'; // (thumbnail, medium, large, full or custom size)
                if( $image ) {
                  echo wp_get_attachment_image( $image, $size );
                }
              ?>
            </div>
            <p class="employee-role"><?php echo str_replace('_', ' ', $type);?></p>
            <?php the_title('<h3 class="employee-name">','</h3>'); ?>
            <p class="employee-title">
              <?php the_field('role');?>
            </p>
          </header>
          <div class="employee-content"><?php the_field('biography');?></div>
        </div>
      </div>
    <?php endwhile;
  endif;

  wp_die();
}