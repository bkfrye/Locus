<?php

if($preview){
    return;
}

if($styles['filter'] == '1'){
    $terms = $this->data->filter_terms;

    $layout_align = 'text-align: left';
    if(isset($styles['align'])){
        $layout_align = 'text-align: ' . $styles['align'];
    }

    $filter_font_size = 'font-size:' . $styles['filter_font_size'];
    $filter_bold = $styles['filter_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $filter_italic = $styles['filter_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $filter_text_transform = 'text-transform: ' . $styles['filter_text_transform'];

    if(count($terms) > 0){
        echo "<ul team-id='" . $this->data->ID ."' class='filter-controls' style='
            $layout_align;
            $filter_font_size;
            $filter_bold;
            $filter_italic;
            $filter_text_transform;
            '>";
            echo '<li class="filter-item">';
            echo '<div class="ats-button ats-button-active" data-filter="*">' . __('Everyone', LA_Team_Builder::$plugin['name']) . '</div>';
            echo '</li>';
            foreach($terms as $term){
                echo '<li class="filter-item">';
                echo '<div class="ats-button" data-filter="' . $term->term_id . '">' . $term->name . '</div>';
                echo '</li>';
            }
            echo '<li class="filter-item">';
            include($base . 'public/partials/parts/search.php');
            echo '</li>';
        echo '</ul>';
    }
    ?>
    <script type="text/javascript">
        (function($){
            $(function () {
                ATS.init_filter(<?php echo $this->data->ID?>);
            });
        }(jQuery));
    </script>
    <?php
}