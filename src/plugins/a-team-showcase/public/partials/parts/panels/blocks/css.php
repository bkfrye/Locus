<?php
$prefix = $this->data->ID . '_' . $employer->ID;
$color = $styles['panel_color'];
$theme = $styles['panel_theme'];
$name_color = '';
if($theme == 'full_photo_dark'){
    $name_color = ".ats-employer-panel-full_photo_dark  .info .name{color:$color !important;}";
}

$css = "
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body input:focus, .ats-employer-panel textarea:focus{
        border-color: $color !important;
        box-shadow: inset 0px -4px 0px 0px $color !important;
    }
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper input[type='button'],
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper input[type='submit'],
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper button{
        background-color: $color !important;
    }
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper input[type='button']:hover,
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper input[type='submit']:hover,
    #ats_employer_panel_" . $prefix . " .ats-employer-panel-body-wrapper button:hover{
        box-shadow: inset 0px -4px 0px 0px $color !important;
    }
    ";
echo '<style type="text/css">' . $css . $name_color . '</style>';