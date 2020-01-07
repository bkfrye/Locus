<?php
    use TeamBuilder\App\Shortcode;

    $color = 'background-color: ' . $styles['divider_color'];
    $width = '';
    $top_margin = '';

    if(isset($styles['divider_width'])){
        $width = 'width: ' . Shortcode::get_size($styles['divider_width']);
    }
    if(isset($styles['divider_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['divider_top_margin']);
    }

    echo "<div class='employer_divider $layout-container sortable'
        style='$top_margin;'
        data-block-name='divider'
        data-tooltip-name='divider'>";
        echo "<span style='$color;$width;'></span>";

    if ($preview) {
        include($base . 'public/partials/parts/tooltip-button.php');
    }
    echo "</div>";
