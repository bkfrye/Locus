<?php
class  LA_Team_Builder_App_Autoloader{
    /**
     * Plugin Autoload
     *
     * @param $class
     * @param $plugin
     * @param $base
     * @internal param $plugin_label
     * @internal param $namespace
     * @internal param $class_name
     */
    public static function load( $class, $plugin, $base) {
        $class = ltrim($class, '\\');
        // prevent including itself
        if ( true !== strpos( $class, 'Autoloader' ) ) {
            // explode class name to array
            $parts = explode('\\', $class);

            // check if
            $diff = array_diff($parts, array($class));
            if(count($diff) == 0){
                $parts = explode('_', $class);
            }

            // split class name to clear Class and Namespace parts
            $class_name = end($parts);
            $class_path = substr($class, 0, strlen($class) - strlen($class_name));

            // remove namespace from Class name and replace some predefined constants
            $class_path = str_replace('LA_' . str_replace(' ', '_', $plugin['label']), '', $class_path);
            $class_path = str_replace($plugin['namespace'], '', $class_path);
            $class_path = str_replace('App', 'includes', $class_path);
            $class_path = str_replace('Back', 'admin', $class_path);
            $class_path = str_replace('Front', 'public', $class_path);
            $class_path = str_replace('\\', DIRECTORY_SEPARATOR, $class_path);
            $class_path = str_replace('_', DIRECTORY_SEPARATOR, $class_path);

            // Path to Wordpress plugin
            $class_file = $base . $class_path . $class_name . '.php';

            if(file_exists($class_file)){
                require_once($class_file);
            }
        }
    }

}