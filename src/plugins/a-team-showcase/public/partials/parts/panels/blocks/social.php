<?php
use TeamBuilder\App\Shortcode;

if($styles['panel_social_visible'] == '1'){
        Shortcode::include_block(
            array(
                'block' => 'social',
                'layout' => $layout,
                'styles' => $styles,
                'preview' => $preview,
                'employer' => $employer,
                'id' => $id
            )
        );
    }
