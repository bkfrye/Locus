<?php
use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Team;
?>
<li team-id="<?php echo $team->ID; ?>">
    <div class="panel panel-team">
        <div class="panel-heading">
            <h5>
                <span class="name"><?php echo esc_html($team->post_title); ?></span>
                <span class="employee-count">
                    <?php
                    $count = count($team->employers);
                    if($count > 0){
                        echo $count . ' people';
                    }
                    ?>
                </span>
            </h5>
            <ul class="team-actions panel-actions">
                <li>
                    <button data-action="delete-team" class="delete-team" title="<?php echo Team::getLabel('delete_item'); ?>">
                        <div id="a-slide-panel-spinner" class="a-spinner" data-wr_replaced="true" style="display: none;">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                        </div>
                        <svg class="icon" viewBox="0 0 28 28">
                            <use xlink:href="#icon-trash"></use>
                        </svg>
                    </button>
                </li>
                <li>
                    <button data-action="edit-team" class="" title="<?php echo Team::getLabel('edit_item'); ?>">
                        <svg class="icon" viewBox="0 0 28 28">
                            <use xlink:href="#icon-pen"></use>
                        </svg>
                    </button>
                </li>
                <li class="shortcode-wrapper" data-action="shortcode-team">
                    <button class="">
                        <span>Shortcode</span>
                    </button>
                    <div class="a-tooltip-wrapper tooltip-top at-transition at-transition-fast">
                        <div class="a-tooltip a-tooltip-arrow">
                            <div class="a-tooltip-content">
                                <?php
                                    $plugin_name = LA_Team_Builder::$plugin['name'];
                                    $id = $team->ID;
                                    $shortcode = '[' . $plugin_name . ' id="' . $id . '"]';
                                    echo "<input readonly type='text' value='$shortcode'";
                                ?>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="panel-body">
            <ul class="team-members">
                <li data-action="edit-team" class="empty">
                    <div class="foto">
                        <svg viewBox="0 0 36 36">
                            <use xlink:href="#icon-plus" transform="translate(-4, -5)"></use>
                        </svg>
                    </div>
                </li>
                <?php
                $employers = $team->employers;
                foreach($employers as $employer){
                    $name = esc_html($employer->post_title);
                    $foto = get_the_post_thumbnail($employer->ID, 'a-small');
                    ?>
                    <li title="<?php echo $name; ?>">
                        <div class="foto">
                            <?php
                            if(has_post_thumbnail($employer->ID)){
                                echo $foto;
                            }else{
                                echo '<img src="' . $default_avatar . '" alt="" ?>';
                            }
                            ?>
                        </div>
                    </li>

                <?php
                }
                ?>
            </ul>
            <div class="team-styles"></div>
        </div>
    </div>
</li>