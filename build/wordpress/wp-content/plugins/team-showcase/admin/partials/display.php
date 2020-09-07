<?php
use LooksAwesome\Common\Post;
use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Team;

$team_tooltip_fields = $this->data['team_tooltip_fields'];
$team_panel_fields = $this->data['team_panel_fields'];
$default_avatar = plugins_url('img/default-avatar.png', dirname(__FILE__));
$labels = array(
    'team' => Team::getLabels(),
    'employer' => Employer::getLabels()
)

?>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class='wrap admin-wrap' id="<?php echo LA_Team_Builder::$plugin['name']; ?>" xmlns="http://www.w3.org/1999/html">
    <?php include_once('svg.html'); ?>
    <div class="a-title">
        <h2>
            <svg viewBox="0 0 56 56">
                <use xlink:href="#face-dashboard"></use>
            </svg>
            <span>
                Manage Team & Employees
            </span>
        </h2>
        <ul class="actions">
            <li id="action-add-buttons">
                <button class="btn-add btn btn-success">
                    <svg viewBox="0 0 36 36">
                        <use xlink:href="#icon-plus"></use>
                    </svg>
                </button>
            </li>
            <?php
            // show settings for admin only
            if(current_user_can('manage_options')):
            ?>
            <li id="action-settings">
                <button class="action btn btn-default" title="Settings">
                    <svg viewBox="0 0 36 36">
                        <use xlink:href="#icon-settings"></use>
                    </svg>
                </button>
            </li>
            <?php endif; ?>
            <li id="action-help">
                <a class="icon action btn btn-default" title="Help" data-action="modal" href="#modal-help">
                    <svg viewBox="0 0 36 36">
                        <use xlink:href="#icon-help"></use>
                    </svg>
                </a>
            </li>
        </ul>
    </div>
    <div class="ui-row version"></div>
    <div class="clearfix ui-row">
        <div class="col-md-8 col-sm-8 ui-column">
            <div class="panel panel-main" id="panel-teams">
                <div class="panel-heading">
                    <h6>
                        <?php
                        echo Team::getLabel('all_items');
                        $teams_count = count($this->data['teams']);
                        if($teams_count > 0){
                            echo ' <span>(';
                            echo count($this->data['teams']);
                            echo ')</span>';
                        }
                        ?>
                    </h6>
                </div>
                <div class="panel-body a-scroll">
                    <div class="padding-wrapper">
                        <?php
                            Post::display_empty_model_message(
                                $teams_count,
                                'teams',
                                'Type name of your first team below and hit enter.'
                            );
                        ?>
                        <ul class="model-list teams-list" id="teams-list">
                            <?php
                            if($teams_count > 0){
                                foreach($this->data['teams'] as $team):
                                    include('cards/team.php');
                                endforeach;
                            }
                            ?>
                        </ul>
                    </div>
                </div>
                <div class="panel-footer create-team-input">
                    <form action="" method="" class="form">
                        <div class="a-slide-panel-spinner a-spinner" data-wr_replaced="true"  style="display: none;">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <input data-action="add-model"
                               data-model="team"
                               name="team_name"
                               type="text"
                               class="form-control"
                               placeholder="<?php echo Team::getLabel('add_new_item'); ?>"/>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-sm-4 ui-column">
            <div class="panel panel-main" id="panel-employers">
                <div class="panel-heading">
                    <h6>
                        <?php
                        echo Employer::getLabel('all_items');
                        $employers_count = count($this->data['employers']);//
                        if($employers_count > 0){
                            echo ' <span class="count">(';
                            echo count($this->data['employers']);
                            echo ')</span>';
                        }
                        ?>
                    </h6>
                    <ul class="panel-actions">
                        <li class="search">
                            <div class="field">
                                <input type="text" data-action="employers-search" placeholder="Find employee" />
                                <span class="icon-close" data-action="search-clear"></span>
                            </div>
                            <button data-action="toggle-employers-search" title="Toggle employees seacrh">
                                <svg viewBox="0 0 28 28">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search" transform="scale(0.7) translate(5,7)"></use>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="panel-body a-scroll">
                    <div class="padding-wrapper">
                        <?php
                            Post::display_empty_model_message(
                                $employers_count,
                                'employees',
                                'Type name of employee below and hit enter.'
                            );
                        ?>
                        <ul class="employers-list model-list awesome-list connected-sortable" id="employers-list">
                            <?php
                                if($employers_count > 0){
                                    $backbone_employers = array();
                                    foreach($this->data['employers'] as $employer):
                                        include('cards/employer.php');
                                    endforeach;
                                }
                            ?>
                        </ul>
                        <?php
                        if($employers_count > 0){
                            include('backbone/employers.php');
                        }
                        ?>
                    </div>
                </div>
                <div class="panel-footer create-team-input">
                    <form action="" method="post" class="form">
                        <div class="a-slide-panel-spinner a-spinner" data-wr_replaced="true"  style="display: none;">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                        <input data-action="add-model"
                               data-model="employer"
                               name="employer_name"
                               type="text"
                               class="form-control"
                               placeholder="<?php echo Employer::getLabel('add_new_item'); ?>"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="ui-row la-footer">
        <div class="col-md-12">
            <span>
                <?php
                echo LA_Team_Builder::$plugin['label'];
                echo ' v. ';
                echo LA_Team_Builder::$plugin['version'];
                ?>
            </span>
            |
            <a target="_blank" href="<?php echo LA_Team_Builder::$plugin['demo_site'];?>/docs/Getting_Started">
                Documentation
            </a>
            |
            <a target="_blank" href="http://codecanyon.net/user/looks_awesome/portfolio">Awesome plugins</a>
        </div>
    </div>
</div>
<div class="a-spinner at-transition" id="main-spinner"></div>
<div class="hide" id="panel-html-pool">
    <?php
        // Include panels forms and icons
        wp_editor('', 'fake_textarea');

        include_once('panels/employer-edit.php');
        include_once('panels/employer-add.php');
        include_once('panels/team-edit.php');
        include_once('panels/team-add.php');

        include_once('panels/help.php');
        include_once('panels/settings.php');
        include_once('parts/preview-help.php');

        include_once('tooltips/add-buttons.php');
        include_once('tooltips/font-settings.php');
        include_once('tooltips/photo-settings.php');
        include_once('tooltips/divider-settings.php');
        include_once('tooltips/social-settings.php');
        include_once('tooltips/skills-settings.php');
    ?>
</div>