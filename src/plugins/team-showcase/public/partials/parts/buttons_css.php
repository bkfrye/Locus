<?php
$id = $this->data->ID;
$button_color = $styles['button_color'];
$button_hover_color = $styles['button_hover_color'];
$button_text_color = $styles['button_text_color'];
$button_text_hover_color = $styles['button_text_hover_color'];
$layout_css .= "#ats-layout-" . $id . " .ats-button{background-color:$button_color;color:$button_text_color;}";
$layout_css .= "#ats-layout-" . $id . " .ats-search input{background-color:$button_color;color:$button_text_color;}";
$layout_css .= "#ats-layout-" . $id . " .ats-search input:focus{border-color:$button_hover_color;}";
$layout_css .= "#ats-layout-" . $id . " .ats-button.ats-button-active,#ats-layout-" . $id . " .ats-button:hover{background-color:$button_hover_color;color:$button_text_hover_color;}";