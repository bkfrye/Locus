<?php
    use TeamBuilder\App\Shortcode;

    $font_size = 'font-size: ' . $styles['position_font_size'];
    $color = 'color: ' . $styles['position_color'];
    $bold = $styles['position_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $italic = $styles['position_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $text_transform = 'text-transform: ' . $styles['position_text_transform'];
    $align = 'text-align: ' . $styles['position_align'];
    //$gaps = $styles['card_gaps'];
    $top_margin = '';
    if(isset($styles['position_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['position_top_margin']);
    }

    if(!empty($employer->position)) {
        echo "<div class='employer_position $layout-container sortable'
                    style='$top_margin;'
                    data-block-name='position'
                    data-tooltip-name='position'>";
        echo "<span class='team-field-content' style='
                    $font_size;
                    $color;
                    $bold;
                    $italic;
                    $align;
                    $text_transform;
                    '>";
        echo esc_html($employer->position);
        echo '</span>';

        if ($preview) {
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }