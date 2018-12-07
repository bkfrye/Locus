<?php
    use TeamBuilder\App\Shortcode;

    $photo_class = $styles['photo_shape'] == 'round' ? 'ats-round' : 'ats-square'; // set foto shape
    $photo_width = 'width: ' . Shortcode::get_size($styles['photo_width']);
    $min_width = 'min-width: ' . $styles['photo_width'];
    $padding_bottom = 'padding-bottom: ' . $styles['photo_width'];
    $sizes = Shortcode::get_image_sizes('a-thumbnail');


    if(isset($employer->ID) && has_post_thumbnail($employer->ID)){
        $foto_id = get_post_thumbnail_id($employer->ID);
        $foto = wp_get_attachment_image_src($foto_id, 'large', false);
        $photo_src = $foto[0];
    }else{
        $photo_src = plugins_url('../../img/default-avatar.jpg', dirname(__FILE__));
        if($preview) {
            $photo_src = plugins_url('../../img/john-doe.jpg', dirname(__FILE__));
        }
    }
    $background = 'background-image:url(' . $photo_src . ')';
    $width = 'width: ' . $sizes[0] . 'px';
    $height = 'height: ' . $sizes[1] . 'px';

    $font_size = 'font-size: ' . ($sizes[0] < 300 ? $sizes[0] : 300 ) / 10 . 'px';

    if(!empty($photo_src)) {
        echo "<div class='employer_photo $layout-container sortable'
                        data-block-name='photo'
                        data-tooltip-name='photo'
                        style='$min_width;$font_size'>";

        echo "<div class='photo-shape $photo_class' style='$photo_width;'>";
        echo "<div class='photo-wrapper'>";
        echo "<div class='photo-container' style='
                    $background;'>";
        echo '</div>';
        echo '</div>';
        echo '</div>';

        if($preview){
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }