<div class="ats-employer-panel ats-employer-panel-clean a-slide-panel-content-wrapper" id="ats_employer_panel_<?php echo $this->data->ID; ?>_<?php echo $employer->ID; ?>">
    <div class="a-scroll">
    <?php include('blocks/title.php'); ?>
    <div class="ats-employer-panel-container">
        <div class="ats-employer-panel-head">
            <?php include('blocks/photo.php'); ?>
            <div class="info">
                <?php include('blocks/name.php'); ?>
                <?php include('blocks/position.php'); ?>
            </div>
            <?php include('blocks/contacts.php'); ?>
        </div>
        <?php include('blocks/social.php'); ?>
        <div class="ats-employer-panel-body">
            <?php include('blocks/body.php'); ?>
        </div>
    </div>
    </div>
    <?php include('blocks/css.php'); ?>
</div>