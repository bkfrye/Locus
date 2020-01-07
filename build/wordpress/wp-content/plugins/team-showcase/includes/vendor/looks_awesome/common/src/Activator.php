<?php

namespace LooksAwesome\Common;

class Activator{
    protected static $args;

    public function __construct($args){
        $this->define_static_vars($args);
    }

    /**
     * Define static variables
     *
     * @param $args
     */
    protected function define_static_vars($args){
        foreach($args as $key => $value){
            self::$args[$key] = $value;
        }
    }

    /**
     * Display error message after activation fail
     */
    public static function admin_message(){
        $message = sprintf(
            __('Plugin <b>%1$s</b> require PHP version %2$s or higher.'),
            self::$args['label'],
            self::$args['require_php']
        );
        $class = "error";
        echo"<div class=\"$class\"> <p>$message</p></div>";
    }

    /**
     * Activate plugin if PHP version compatible
     */
    public static function activate() {
        if(!self::compatible_version()){
            add_action('admin_notices', 'admin_message');
            deactivate_plugins(self::$args['name']);
        }
    }

    /**
     * Compare PHP versions
     *
     * @return bool
     */
    public static function compatible_version(){
        if(version_compare(PHP_VERSION, self::$args['require_php']) == -1 ){
            return false;
        }else{
            return true;
        }
    }

    /**
     * If plugin already enabled in some way
     *
     * Check PHP version to prevent WP admin crash and deactivate plugin
     */
    public static function check_version(){
        if(!self::compatible_version()){
            $plugin = self::$args['name'] . '/init.php';
            if(is_plugin_active($plugin)){
                deactivate_plugins($plugin);
            }
            add_action('admin_notices', 'Awesome_Activator::admin_message');
            if(isset($_GET['activate'])){
                unset($_GET['activate']);
            }
        }
    }
}
