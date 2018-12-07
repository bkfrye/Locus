<?php

namespace LooksAwesome\Common;

class Response {
    public static function get(\WP_Ajax_Response $response, $data, $type){
        if($type == 'errors'){
            $response->add(array(
                    'what' => $type,
                    'id' => $data
                ));
        }else{
            $response->add(array(
                    'what'=> $type,
                    'action'=> $type,
                    'id'=>'1',
                    'data'=> $data,
                    'supplemental' => ''
                ));
        }
        return $response;
    }

} 