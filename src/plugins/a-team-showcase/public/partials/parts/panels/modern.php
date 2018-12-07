<?php
use TeamBuilder\App\Model\Employer;

$photo = Employer::get_photo($employer->ID, $preview);
?>
<div class="ats-employer-panel ats-employer-panel-modern a-slide-panel-content-wrapper" id="ats_employer_panel_<?php echo $this->data->ID; ?>_<?php echo $employer->ID; ?>">
    <div class="a-scroll">
        <?php include('blocks/title.php'); ?>
        <div class="ats-employer-panel-container">
            <div class="ats-employer-panel-head">
                <div class="photo_blur" style="background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(<?php echo $photo; ?>) 50% 50% no-repeat">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="0" width="0">
                        <defs>
                            <filter id="ats_panel_blur" x="0" y="0">
                                <feGaussianBlur stdDeviation="5" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <?php include('blocks/photo.php'); ?>
                <div class="info">
                    <?php include('blocks/name.php'); ?>
                    <?php include('blocks/position.php'); ?>
                </div>
                <?php include('blocks/social.php'); ?>
            </div>
            <div class="ats-employer-panel-body">
                <?php include('blocks/contacts.php'); ?>
                <?php include('blocks/body.php'); ?>
            </div>
        </div>
    </div>
    <?php include('blocks/css.php'); ?>
</div>