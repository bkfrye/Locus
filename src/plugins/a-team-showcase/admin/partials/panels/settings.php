<?php
$path = plugin_dir_path(dirname(__FILE__));
?>
<div id="settings-wrap" class="a-slide-panel-content-wrapper">
    <div class="a-title">
        <h2>
            <svg viewBox="0 0 56 56">
                <use xlink:href="#face-dashboard"></use>
            </svg>
            <span>Settings</span>
        </h2>
        <?php include( $path . 'parts/panel-settings-buttons.php'); ?>
    </div>
    <div class="a-scroll">
        <div class="wrapper a-slide-panel-content">
            <?php include( $path . 'forms/settings-form.php'); ?>
        </div>
    </div>
</div>