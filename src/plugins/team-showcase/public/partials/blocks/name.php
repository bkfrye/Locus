<?php
    use TeamBuilder\App\Shortcode;

    $font_size = 'font-size: ' . $styles['name_font_size'];
    $color = 'color: ' . $styles['name_color'];
    $bold = $styles['name_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $italic = $styles['name_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $text_transform = 'text-transform: ' . $styles['name_text_transform'];
    $align = 'text-align: ' . $styles['name_align'];
    //$gaps = $styles['card_gaps'];
    $top_margin = '';
    if(isset($styles['name_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['name_top_margin']);
    }

    if(!empty($employer->post_title)) {
        echo "<div class='employer_name $layout-container sortable'
                    style='$top_margin;'
                    data-block-name='name'
                    data-tooltip-name='name'>";
        echo "<span class='team-field-content' style='
                        $font_size;
                        $color;
                        $bold;
                        $italic;
                        $align;
                        $text_transform;
                        '>";
        echo esc_html($employer->post_title);
        echo '</span>';
        if ($preview) {
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }