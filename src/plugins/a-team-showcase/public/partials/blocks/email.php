<?php
    use TeamBuilder\App\Shortcode;

    $font_size = 'font-size: ' . $styles['contacts_font_size'];
    $color = 'color: ' . $styles['contacts_color'];
    $bold = $styles['contacts_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $italic = $styles['contacts_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $text_transform = 'text-transform: ' . $styles['contacts_text_transform'];
    $align = 'text-align: ' . $styles['contacts_align'];
    $top_margin = '';
    if(isset($styles['contacts_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['contacts_top_margin']);
    }

    if (!empty($employer->email)) {
        $email = esc_html($employer->email);
        echo "<div class='employer_email $layout-container sortable'
                style='$top_margin;'
                data-block-name='email'
                data-tooltip-name='contacts'>";
        echo "<span class='team-field-content' style='
                    $font_size;
                    $color;
                    $bold;
                    $italic;
                    $align;
                    $text_transform;'>";
        echo '<i class="fa fa-envelope-o"></i>';
        if($preview){
            echo $email;
        }else{
            echo '<a href="mailto:' . $email . '" title="Write email">';
            echo $email;
            echo '</a>';
        }
        echo '</span>';

        if ($preview) {
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }