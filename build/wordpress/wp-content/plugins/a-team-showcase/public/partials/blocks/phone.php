<?php
    use TeamBuilder\App\Shortcode;

    $font_size = 'font-size: ' . $styles['contacts_font_size'];
    $color = 'color: ' . $styles['contacts_color'];
    $bold = $styles['contacts_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $italic = $styles['contacts_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $text_transform = 'text-transform: ' . $styles['contacts_text_transform'];
    $align = 'text-align: ' . $styles['contacts_align'];
    //$gaps = $styles['card_gaps'];
    $top_margin = '';
    if(isset($styles['contacts_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['contacts_top_margin']);
    }

    if(!empty($employer->phone)){
        $phone = esc_html($employer->phone);
        echo "<div class='employer_phone $layout-container sortable'
                style='$top_margin;'
                data-block-name='phone'
                data-tooltip-name='contacts'>";
        echo "<span class='team-field-content' style='
                $font_size;
                $color;
                $bold;
                $italic;
                $align;
                $text_transform;
                '>";
        echo '<i class="fa fa-phone"></i>';
        if($preview){
            echo $phone;
        }else{
            echo '<a href="tel:' . $phone . '" title="Phone call">';
            echo $phone;
            echo '</a>';
        }

        echo '</span>';
        if($preview){
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }
