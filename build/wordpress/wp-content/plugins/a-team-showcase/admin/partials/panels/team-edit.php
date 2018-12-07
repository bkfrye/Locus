<?php
use TeamBuilder\App\Model\Team;
$path = plugin_dir_path(dirname(__FILE__));
?>
<div id="team-edit-wrap" class="at-transition a-slide-panel-content-wrapper">
    <div class="a-title">
        <h2>
            <svg viewBox="0 0 56 56">
                <use xlink:href="#face-team"></use>
            </svg>
            <span>
                <?php echo Team::getLabel('edit_item'); ?>
            </span>
        </h2>
        <?php include( $path . 'parts/panel-team-buttons.php'); ?>
    </div>
    <div class="a-scroll">
        <div class="wrapper a-slide-panel-content">
            <?php include( $path . 'forms/team-form.php'); ?>
        </div>
    </div>
</div>