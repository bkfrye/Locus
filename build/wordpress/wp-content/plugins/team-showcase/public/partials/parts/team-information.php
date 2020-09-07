<?php
$layout_align = 'text-align: left';
if(isset($styles['align'])){
    $layout_align = 'text-align: ' . $styles['align'];
}
if(!empty($this->data->title)){
    echo "<h2 class='ats-team-title'
                style='$layout_align'>";
    echo esc_html($this->data->title);
    echo '</h2>';
}

if(!empty($this->data->post_excerpt)) {
    echo "<p class='ats-team-description'
                style='$layout_align'>";
        echo esc_html($this->data->post_excerpt);
    echo '</p>';
}

