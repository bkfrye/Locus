<?php
use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Team;

$employer = new Employer(array('post' => $employer));

$id = $employer->ID;
$name = esc_html($employer->post_title);
$position = esc_html($employer->position);
$photo = get_the_post_thumbnail($employer->ID, 'a-small');
array_push($backbone_employers, array(
    'id' => $id,
    'name' => $name,
    'position' => $position,
    'photo' => $photo
));
?>

<li data-action="edit-employer"
    class="clearfix"
    employer-id="<?php echo $id; ?>"
    title="<?php echo $name; ?>">
    <div class="wrapper">
        <div class="foto">
            <?php
            if (has_post_thumbnail($id)) {
                echo $photo;
            } else {
                echo '<img src="' . $default_avatar . '" alt="" ?>';
            }
            ?>
        </div>
        <div class="name_position">
            <span class="name"><?php echo $name ?></span>
            <span class="position"><?php echo $position ?></span>
        </div>
        <button class="delete-employer" title="<?php echo Employer::getLabel('delete_item'); ?>">
            <span><?php echo Employer::getLabel('delete_item'); ?></span>
            <svg viewBox="0 0 20 20">
                <use xlink:href="#icon-delete"></use>
            </svg>
        </button>
        <button class="btn-action remove-employer at-transition at-transition-fast" title="Remove" data-action="remove-employer">
            <svg viewBox="0 0 20 20">
                <use xlink:href="#icon-delete"></use>
            </svg>
        </button>
        <?php
        $employer_teams = $employer->teams;
        if (gettype($employer->teams) == 'array' && sizeof($employer->teams) > 0) {
            $count = sizeof($employer_teams);
            echo '<div class="teams">';
            echo '<span class="teams_count">' . $count . '</span> ';
            echo $count > 1 ? Team::getLabel('name') : Team::getLabel('singular_name');
            echo '</div>';
        }
        ?>
    </div>
</li>