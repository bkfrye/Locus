<?php

namespace LooksAwesome\Common;

class Render {
    private $template = '';
    private $data = array();

    /**
     * @param null $template
     * @param null $data
     */
    public function __construct($template = null, $data = null){
        if(!isset($template)){
            echo 'Set template to render page';
        }else{
            $this->template = $template;
            $this->data = $data;
        }
    }

    /**
     * @return string
     */
    public function render(){
        if(file_exists($this->template)){
            ob_start();
            include($this->template);
            return ob_get_clean();
        }
    }
} 