<?php
    use TeamBuilder\App\Shortcode;

    $social_color = 'color: ' . $styles['social_color'];
    $social_size = 'font-size: ' . $styles['social_size'];
    $align = 'text-align: ' . $styles['social_align'];
    $top_margin = '';
    $total = 0;
    if(isset($styles['social_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['social_top_margin']);
    }
    $html = "<div class='employer_social $layout-container sortable'
                style='
                $top_margin;
                $social_color;
                $social_size;
                $align;
                '
                data-block-name='social'
                data-tooltip-name='social'>";
    $html .= "<span class='team-field-content'>";

    $social_profiles = array(
        'facebook' => array(
            'icon' => 'facebook-official',
            'label' => 'Facebook'
        ),
        'twitter' => array(
            'icon' => 'twitter',
            'label' => 'Twitter'
        ),
        'linkedin' => array(
            'icon' => 'linkedin',
            'label' => 'Linkedin'
        ),
        'google' => array(
            'icon' => 'google-plus',
            'label' => 'Google+'
        ),
        'instagram' => array(
            'icon' => 'instagram',
            'label' => 'Instagram'
        ),
        'pinterest' => array(
            'icon' => 'pinterest',
            'label' => 'Pinterest'
        ),
        'youtube' => array(
            'icon' => 'youtube',
            'label' => 'Youtube'
        ),
        'vimeo' => array(
            'icon' => 'vimeo',
            'label' => 'Vimeo'
        ),
        'dribble' => array(
            'icon' => 'dribbble',
            'label' => 'Dribbble'
        ),
        'flickr' => array(
            'icon' => 'flickr',
            'label' => 'Flickr'
        ),
        'github' => array(
            'icon' => 'github',
            'label' => 'Github'
        )
    );

    foreach($social_profiles as $key => $value){
        if(!empty($employer->{$key})){
            $total++;
            if($preview){
                $html .= '<i class="fa fa-' . $value['icon'] . '"></i>';
            }else{
                $html .= "<a class='ats-social-" . $key . "' href='" . esc_html($employer->{$key}) . "' target='_blank'>";
                $html .= '<i class="fa fa-' . $value['icon'] . '"></i><span class="ats-tooltip">' . $value['label'] . '</span>';
                $html .= '</a>';
            }
        }

    }

    $html .= '</span>';

    if($preview){
        ob_start();
        include($base . 'public/partials/parts/tooltip-button.php');
        $html .= ob_get_contents();
        ob_end_clean();
    }
    $html .= '</div>';

    if($total > 0){
        echo $html;
    }else{
        echo '<div class="sortable"></div>';
    }