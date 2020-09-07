<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://looks-awesome.com
 * @since             1.0.0
 * @package           LA_Team_Builder
 *
 * @wordpress-plugin
 * Plugin Name:       Team Builder
 * Plugin URI:        http://team.looks-awesome.com/
 * Description:       Awesome Team Builder plugin
 * Version:           1.5.1
 * Author:            Looks Awesome
 * Author URI:        http://looks-awesome.com
 * Text Domain:       a-team-showcase
 * Domain Path:       /languages
 */

use TeamBuilder\App\Model\Settings;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class LA_Team_Builder{
    protected $activator;
    public static $plugin = array(
        'name' => 'a-team-showcase',
        'label' => 'Team Builder',
        'prefix' => 'ats',
        'demo_site' => 'http://team.looks-awesome.com',
        'version' => '1.5.1',
        'require_php' => '5.3.0',
        'namespace' => 'TeamBuilder',
        'base' => '',
        'base_url' => '',
        'mode' => ''
    );

    public static function init(){
        $activator = new LA_Team_Builder_App_Activator(self::$plugin);

        add_action( 'admin_init', array( 'LA_Team_Builder_App_Activator', 'check_version' ) );
        if(!call_user_func(array($activator, 'compatible_version'))){
            return;
        }
        self::$plugin['base'] = plugin_dir_path(__FILE__);
        self::$plugin['base_url'] = plugin_dir_url(__FILE__);
        $env = null;
        if(file_exists(self::$plugin['base'] . 'env.json')){
            $env = json_decode(file_get_contents(self::$plugin['base'] . 'env.json'), true);
        }
        self::$plugin['mode'] = $env['mode'] ? $env['mode'] : 'dev';

        $settings = new Settings();
        $settings::init();

        new LA_Team_Builder_App_Plugin(self::$plugin);
    }

    public static function activate(){
        LA_Team_Builder_App_Activator::activate();
    }

    public static function deactivate(){
        LA_Team_Builder_App_Deactivator::deactivate();
    }

    public static function autoloader($class){
        $base = plugin_dir_path(__FILE__);
        if(!class_exists('LA_Team_Builder_App_Autoloader')){
            include_once $base . 'includes/Autoloader.php';
        }
        LA_Team_Builder_App_Autoloader::load($class, self::$plugin, $base);
    }
}

register_activation_hook( __FILE__, 'LA_Team_Builder::activate' );
register_deactivation_hook( __FILE__, 'LA_Team_Builder::deactivate' );

/**
 * Plugin Autoload
 */

// composer autoload
require __DIR__ . '/includes/vendor/autoload.php';

spl_autoload_register( 'LA_Team_Builder::autoloader' );
$dir = plugin_dir_path(__FILE__);

LA_Team_Builder::init();