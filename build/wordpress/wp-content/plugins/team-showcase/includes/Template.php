<?php

namespace TeamBuilder\App;

class Template{
    private static $templates = array(
        'grid', 'table', 'widget'
    );

    public function __construct(){

    }

    public static function get_templates(){
        $result = array();
        foreach(self::$templates as $template){
            $result[$template] = self::get_template($template);
        }

        return $result;
    }

    public static function get_template($template){
        $base = plugin_dir_path(dirname(__FILE__));
        include($base . 'includes/templates/' . $template . '.php');
        return ${$template . '_templates'};
    }
}