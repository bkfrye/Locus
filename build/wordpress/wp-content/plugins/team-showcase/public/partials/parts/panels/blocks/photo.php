<?php
    use TeamBuilder\App\Model\Employer;

    $id = $employer->ID;
    $photo = Employer::get_photo($id, $preview);
    $color = $styles['panel_color'];
?>
<div class="photo" style="border-color: <?php echo $color; ?>">
    <div class="photo_wrapper">
        <div style="background-image: url(<?php echo $photo; ?>)"></div>
    </div>
</div>
