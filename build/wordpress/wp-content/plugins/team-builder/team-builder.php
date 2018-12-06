<?php
/**
 * Plugin Name: Team  Builder
 * Version: 1.2.9
 * Description:  Team Builder is most flexible WordPress plugin available to create and manage your Team page with drag and drop feature.
 * Author: wpshopmart
 * Author URI: https://www.wpshopmart.com
 * Plugin URI: https://www.wpshopmart.com/plugins
 */

if ( ! defined( 'ABSPATH' ) ) exit; 
 /**
 * DEFINE PATHS
 */
define("wpshopmart_team_b_directory_url", plugin_dir_url(__FILE__));
define("wpshopmart_team_b_text_domain", "wpsm_team_b");

require_once("ink/install.php");

function wpsm_team_b_default_data() {
	$Settings_Array = serialize( array(
		"team_mb_name_clr" 	 => "#000000",
		"team_mb_pos_clr" => "#000000",
		"team_mb_desc_clr" => "#000000",
		"team_mb_social_icon_clr"   => "#4f4f4f",
		"team_mb_social_icon_clr_bg"   => "#e5e5e5",
		"team_mb_name_ft_size"   => 18,
		"team_mb_pos_ft_size"   => 14,
		"team_mb_desc_ft_size"   => 14,
		"font_family"   => "Open Sans",
		"team_layout"   => 4,
		"custom_css"   => "",
		"team_mb_wrap_bg_clr"   => "#ffffff",
		"design"   => 1,
	));
	add_option('Team_B_default_Settings', $Settings_Array);
}
register_activation_hook( __FILE__, 'wpsm_team_b_default_data' );

add_action('admin_menu' , 'wpsm_team_b_recom_menu');
function wpsm_team_b_recom_menu() {
	$submenu2 = add_submenu_page('edit.php?post_type=team_builder', __('Team Free Vs Pro', wpshopmart_team_b_text_domain), __('Team Free Vs Pro', wpshopmart_team_b_text_domain), 'administrator', 'wpsm_team_b_fvp_page', 'wpsm_team_b_fvp_page_funct');
	
	$submenu = add_submenu_page('edit.php?post_type=team_builder', __('More_Free_Plugins', wpshopmart_team_b_text_domain), __('More Free Plugins', wpshopmart_team_b_text_domain), 'administrator', 'wpsm_team_b_recom_page', 'wpsm_team_b_recom_page_funct');
	
	//add hook to add styles and scripts for team pluign admin page
    add_action( 'admin_print_styles-' . $submenu, 'wpsm_team_b_recom_js_css' );
	add_action( 'admin_print_styles-' . $submenu2, 'wpsm_team_b_fvp_js_css' );
	}
	function wpsm_team_b_recom_js_css(){
		wp_enqueue_style('wpsm_team_b_bootstrap_css_recom', wpshopmart_team_b_directory_url.'assets/css/bootstrap.css');
		wp_enqueue_style('wpsm_ac_help_css', wpshopmart_team_b_directory_url.'assets/css/help.css');
	}
function wpsm_team_b_recom_page_funct(){
	require_once('ink/admin/free.php');
}
function wpsm_team_b_fvp_js_css(){
	wp_enqueue_style('wpsm_team_settings_fvp', wpshopmart_team_b_directory_url.'assets/css/settings.css');
	
}
function wpsm_team_b_fvp_page_funct(){
	require_once('ink/admin/fvp.php');
}

/**
 * CPT CLASS
*/
 
require_once("ink/admin/menu.php");

/**
 * SHORTCODE
 */
 
require_once("template/shortcode.php");
?>