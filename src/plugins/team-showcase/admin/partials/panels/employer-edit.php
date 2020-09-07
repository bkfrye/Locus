<?php
use TeamBuilder\App\Model\Employer;
$path = plugin_dir_path(dirname(__FILE__));
?>
<div id="employer-edit-wrap" class="at-transition a-slide-panel-content-wrapper">
    <div class="a-title">
        <h2>
            <svg viewBox="0 0 56 56">
                <use xlink:href="#face-employer"></use>
            </svg>
            <span>
                <?php echo Employer::getLabel('edit_item'); ?>
            </span>
        </h2>
        <?php include( $path . 'parts/panel-employer-buttons.php'); ?>
    </div>
    <div class="a-scroll">
        <div class="wrapper a-slide-panel-content">
            <?php
                include( $path . 'forms/employer-form.php');
            ?>
        </div>
    </div>
</div>