<?php

namespace TeamBuilder\Front;

use TeamBuilder\App\Shortcode;

class Frontend {
	/**
	 * Plugin running mode. By default is dev
	 */
	private static $plugin_name;
	private static $version;
	private static $mode;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		$env = null;

		if(file_exists(plugin_dir_path(__DIR__) . 'env.json')){
			$env = json_decode(file_get_contents(plugin_dir_path(__DIR__) . 'env.json'), true);
		}

		self::$plugin_name = \LA_Team_Builder::$plugin['name'];
		self::$version = \LA_Team_Builder::$plugin['version'];
		self::$mode = $env['mode'] ?: 'dev';
	}


	public function register_shortcode(){
		new Shortcode();
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function register_styles() {

		/**
         * Register shortcode styles but not enqueue
		 */

		wp_register_style(  self::$plugin_name . '-font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', array(), self::$version, 'all' );

		if(self::$mode == 'dev'){
			wp_register_style( self::$plugin_name . '-shortcode', plugin_dir_url( __FILE__ ) . 'css/style.css', array(), self::$version, 'all' );
			wp_register_style( self::$plugin_name . '-panel', plugin_dir_url( __FILE__ ) . 'css/panel.css', array(), self::$version, 'all' );
			wp_register_style( self::$plugin_name . '-slick-carousel-theme', plugin_dir_url( __FILE__ ) . 'css/slick-theme.css', array(), self::$version, 'all' );
			wp_register_style( 'slick-carousel', plugin_dir_url( __FILE__ ) . 'css/slick.css', array(), self::$version, 'all' );
			wp_register_style( 'awesome-panel', plugin_dir_url(__DIR__) . 'admin/css/vendor/awesome/panel.css', self::$version, 'all');
		}else{
			wp_register_style(self::$plugin_name . '-all', plugin_dir_url( __FILE__ ) . 'css/all.min.css', array(), self::$version, 'all' );
		}

	}

	public function register_script_safe($handle, $src, $deps, $ver, $in_footer){
		if(wp_script_is($handle, 'registered')){
			return;
		}else{
			wp_register_script($handle, $src, $deps, $ver, $in_footer);
		}
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function register_scripts() {
		if(self::$mode == 'dev') {
			$this->register_script_safe(self::$plugin_name . '-shortcode', plugin_dir_url(__FILE__) . 'js/script.js', array('jquery', 'awesome-viewport'), self::$version, false);
			$this->register_script_safe('slick-carousel', plugin_dir_url(__FILE__) . 'js/vendor/slick.min.js', array('jquery'), self::$version, false);
			$this->register_script_safe('awesome-filter', plugin_dir_url(__FILE__) . 'js/vendor/awesome/filter.js', array('jquery'), self::$version, false);
			$this->register_script_safe('awesome-viewport', plugin_dir_url(__FILE__) . 'js/vendor/awesome/viewport.js', array('jquery'), self::$version, false);
			$this->register_script_safe('awesome-panel', plugin_dir_url(__DIR__) . 'admin/js/vendor/awesome/panel.js', array('jquery'), self::$version, false);
			$this->register_script_safe('awesome-util', plugin_dir_url(__DIR__) . 'admin/js/vendor/awesome/util.js', array('jquery'), self::$version, false);
		}else{
			wp_register_script(self::$plugin_name . '-all', plugin_dir_url(__FILE__) . 'js/all.min.js', array('jquery'), $this->version, false);
		}
	}
}
