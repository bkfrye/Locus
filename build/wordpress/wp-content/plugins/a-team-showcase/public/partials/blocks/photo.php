<?php
    use TeamBuilder\App\Shortcode;

    $photo_class = $styles['photo_shape'] == 'round' ? 'ats-round' : 'ats-square'; // set foto shape
    $photo_size = $styles['photo_size'];
    $photo_width = preg_replace('/[^0-9]/', '', $styles['photo_width']);

    if($photo_size == 'custom'){
        $sizes = array(
            $photo_width,
            $photo_width,
            true
        );
        $photo_width = 'width: ' . Shortcode::get_size($styles['photo_width']);
        $padding_bottom = 'padding-bottom: ' . $styles['photo_width'];
    }else{
        $sizes = Shortcode::get_image_sizes($photo_size);
        $photo_width = 'width: 100%';
        $padding_bottom = 'padding-bottom: 100%';
    }

    $top_margin = $photo_size != 'a-full' ? 'margin-top: ' . Shortcode::get_size($styles['photo_top_margin']) : '';
    $photo_src = Employer::get_photo($employer->ID, $preview);

    $background = 'background-image:url(' . $photo_src . ')';
    $width = 'width: ' . $sizes[0] . 'px';
    $height = 'height: ' . $sizes[1] . 'px';

    $font_size = 'font-size: ' . ($sizes[0] < 300 ? $sizes[0] : 300 ) / 10 . 'px';

    if(!empty($photo_src)) {
        echo "<div class='employer_photo $layout-container sortable'
                        data-block-name='photo'
                        data-tooltip-name='photo'
                        style='
                        $top_margin;
                        $font_size;'>";

        echo "<div class='photo-shape $photo_class' style='$photo_width;'>";
        echo "<div class='photo-wrapper'>";
        echo "<div class='photo-container' style='
                    $background;
                    '>";
        echo '</div>';
        echo '</div>';
        echo '</div>';

        if ($preview) {
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }