<?php
use TeamBuilder\App\Model\Employer;

$photo = Employer::get_photo($employer->ID, $preview);
?>
<div class="ats-employer-panel ats-employer-panel-full_photo_dark a-slide-panel-content-wrapper" id="ats_employer_panel_<?php echo $this->data->ID; ?>_<?php echo $employer->ID; ?>">
    <div class="a-scroll">
        <?php include('blocks/title.php'); ?>
        <div class="ats-employer-panel-container">
            <div class="ats-employer-panel-head" style="background: url(<?php echo $photo; ?>) 50% 50% no-repeat;">
                <div class="info">
                    <?php include('blocks/name.php'); ?>
                    <?php include('blocks/position.php'); ?>
                </div>
            </div>
            <div class="ats-employer-panel-body">
                <?php include('blocks/contacts.php'); ?>
                <?php include('blocks/body.php'); ?>
                <?php include('blocks/social.php'); ?>
            </div>
        </div>
    </div>
    <?php include('blocks/css.php'); ?>
</div>