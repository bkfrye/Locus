<?php
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

function wpdocs_register_my_custom_menu_page(){
  add_menu_page(
		__( 'Employees Menu', 'locus' ),
		'Employees',
		'manage_options',
		'employee-menu',
		'',
		'',
		21
	);
}
add_action( 'admin_menu', 'wpdocs_register_my_custom_menu_page' );

/**
* Display a custom menu page
*/
function my_custom_menu_page(){
   esc_html_e( 'Admin Page Test', 'locus' );
}


// Register Custom Post Type
function employees_management() {

	$labels = array(
		'name'                  => _x( 'Management', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Manager', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Management', 'locus' ),
		'name_admin_bar'        => __( 'Management', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Management', 'locus' ),
		'add_new_item'          => __( 'Add New Manager', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Manager', 'locus' ),
		'edit_item'             => __( 'Edit Manager', 'locus' ),
		'update_item'           => __( 'Update Manager', 'locus' ),
		'view_item'             => __( 'View Manager', 'locus' ),
		'view_items'            => __( 'View Management', 'locus' ),
		'search_items'          => __( 'Search Management', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Managers', 'locus' ),
		'description'           => __( 'Management List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => 'employee-menu',
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'management', $args );

}
add_action( 'init', 'employees_management', 0 );


function employees_board() {

	$labels = array(
		'name'                  => _x( 'Board of Directors', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Board Member', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Board of Directors', 'locus' ),
		'name_admin_bar'        => __( 'Board of Directors', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Board Members', 'locus' ),
		'add_new_item'          => __( 'Add New Board Member', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Board Member', 'locus' ),
		'edit_item'             => __( 'Edit Board Member', 'locus' ),
		'update_item'           => __( 'Update Board Member', 'locus' ),
		'view_item'             => __( 'View Board Member', 'locus' ),
		'view_items'            => __( 'View Board of Directors', 'locus' ),
		'search_items'          => __( 'Search Board of Directors', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Board of Directors', 'locus' ),
		'description'           => __( 'Board of Directors List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => 'employee-menu',
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'board_of_directors', $args );

}
add_action( 'init', 'employees_board', 0 );


function employees_founders() {

	$labels = array(
		'name'                  => _x( 'Scientific Founders', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Scientific Founder', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Scientific Founders', 'locus' ),
		'name_admin_bar'        => __( 'Scientific Founders', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Scientific Founders', 'locus' ),
		'add_new_item'          => __( 'Add New Scientific Founder', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Scientific Founder', 'locus' ),
		'edit_item'             => __( 'Edit Scientific Founder', 'locus' ),
		'update_item'           => __( 'Update Scientific Founder', 'locus' ),
		'view_item'             => __( 'View Scientific Founder', 'locus' ),
		'view_items'            => __( 'View Scientific Founders', 'locus' ),
		'search_items'          => __( 'Search Scientific Founders', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Scientific Founders', 'locus' ),
		'description'           => __( 'Scientific Founders List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => 'employee-menu',
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'scientific_founders', $args );

}
add_action( 'init', 'employees_founders', 0 );

function employees_advisors() {

	$labels = array(
		'name'                  => _x( 'Advisors', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Advisor', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Advisors', 'locus' ),
		'name_admin_bar'        => __( 'Advisors', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Advisors', 'locus' ),
		'add_new_item'          => __( 'Add New Advisor', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Advisor', 'locus' ),
		'edit_item'             => __( 'Edit Scientific Founder', 'locus' ),
		'update_item'           => __( 'Update Advisor', 'locus' ),
		'view_item'             => __( 'View Advisor', 'locus' ),
		'view_items'            => __( 'View Advisors', 'locus' ),
		'search_items'          => __( 'Search Advisors', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Advisors', 'locus' ),
		'description'           => __( 'Advisors List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => 'employee-menu',
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'advisors', $args );

}
add_action( 'init', 'employees_advisors', 0 );

function employees_team() {

	$labels = array(
		'name'                  => _x( 'Team', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Team Member', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Team', 'locus' ),
		'name_admin_bar'        => __( 'Team', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Team', 'locus' ),
		'add_new_item'          => __( 'Add New Team Member', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Team Member', 'locus' ),
		'edit_item'             => __( 'Edit Team Member', 'locus' ),
		'update_item'           => __( 'Update Team Member', 'locus' ),
		'view_item'             => __( 'View Team Member', 'locus' ),
		'view_items'            => __( 'View Team', 'locus' ),
		'search_items'          => __( 'Search Team', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Team', 'locus' ),
		'description'           => __( 'Team List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => 'employee-menu',
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'team', $args );

}
add_action( 'init', 'employees_team', 0 );

function careers() {

	$labels = array(
		'name'                  => _x( 'Job Posts', 'Post Type General Name', 'locus' ),
		'singular_name'         => _x( 'Job Post', 'Post Type Singular Name', 'locus' ),
		'menu_name'             => __( 'Job Post', 'locus' ),
		'name_admin_bar'        => __( 'Job Post', 'locus' ),
		'parent_item_colon'     => __( '', 'locus' ),
		'all_items'             => __( 'Job Posts', 'locus' ),
		'add_new_item'          => __( 'Add New Job Post', 'locus' ),
		'add_new'               => __( 'Add New', 'locus' ),
		'new_item'              => __( 'New Job Post', 'locus' ),
		'edit_item'             => __( 'Edit Job Post', 'locus' ),
		'update_item'           => __( 'Update Job Post', 'locus' ),
		'view_item'             => __( 'View Job Post', 'locus' ),
		'view_items'            => __( 'View Jobs', 'locus' ),
		'search_items'          => __( 'Search Jobs', 'locus' ),
		'not_found'             => __( 'Not found', 'locus' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'locus' ),
		'featured_image'        => __( 'Featured Image', 'locus' ),
		'set_featured_image'    => __( 'Set featured image', 'locus' ),
		'remove_featured_image' => __( 'Remove featured image', 'locus' ),
		'use_featured_image'    => __( 'Use as featured image', 'locus' ),
		'insert_into_item'      => __( 'Insert into item', 'locus' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'locus' ),
		'items_list'            => __( 'Items list', 'locus' ),
		'items_list_navigation' => __( 'Items list navigation', 'locus' ),
		'filter_items_list'     => __( 'Filter items list', 'locus' ),
	);
	$args = array(
		'label'                 => __( 'Job Post', 'locus' ),
		'description'           => __( 'Job Posting List', 'locus' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'custom-fields' ),
		'menu_icon'           	=> 'dashicons-megaphone',
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'careers', $args );

}
add_action( 'init', 'careers', 0 );
