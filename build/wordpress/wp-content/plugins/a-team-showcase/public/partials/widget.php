<?php
    use TeamBuilder\App\Model\Employer;
    use TeamBuilder\App\Shortcode;

    $base = LA_Team_Builder::$plugin['base'];
    $layout = 'widget';
    $hover_class = '';
    $layout_css = $this->data->custom_css ?: '';
    $preview = $this->data->preview;
    $styles = $this->data->styles[$layout] ?: $this->data->custom_fields['styles'][$layout];
    $panel = $styles['panel'];
    $panel_animation = $styles['panel_animation'];

    $hover = $styles['hover'];
    if ($hover != 'off') {
        $hover_class = 'ats-effect-' . $hover;
    }

    $gaps = 'padding: ' . Shortcode::get_size($styles['card_gaps']);
    $blocks_order = $styles['blocks_order'];
    $border_color = $styles['card_border_color'];
    $i = 1;

    $even_css = '#ats-layout-' . $this->data->ID . ' .employers-box li:not(.filter-hide):nth-child(even){background-color:' . $styles['card_even_row_color'] . ';}';

    echo Shortcode::$ad;
    echo '<div class="ats-layout-widget ats-layout ' . $hover_class . '" id="ats-layout-' . $this->data->ID . '">';
    echo '<style type="text/css">' . $layout_css . $even_css . '</style>';

    include($base . 'public/partials/parts/team-information.php');
    include($base . 'public/partials/parts/search.php');

    echo "<ul team-id='" . $this->data->ID . "' class='filter-container employers-box'>";
    if (count($this->data->employers) > 0):
        $employers = $this->data->employers ?: $this->data->custom_fields['employers'];
        foreach ($employers as $employer):
            $id = $employer->ID;
            $terms = wp_get_post_terms($id, Employer::getTaxonomy(), array('fields' => 'ids'));
            $terms = array_map(function ($term) {
                return 'awesome-filter-' . $term;
            }, $terms);
            $terms = implode(' ', $terms);

            $clicable = !empty($employer->profile) || $panel ? 'ats-profile' : '';
            $profile = esc_html($employer->profile);
            $profile_title = !empty($employer->profile) ? 'Open profile' : '';
            $name = esc_html($employer->post_title);

            echo "<li class='$terms filter-item' employer-id='$id' data-title='$name'>";

            echo "<div $clicable data-profile='$profile'
                                class='display-table'
                                title='$profile_title'
                                style='
                        border-top: 1px solid $border_color;
                        border-bottom: 1px solid $border_color;
                        $gaps;'
                        >";
            Shortcode::include_block(
                array(
                    'block' => 'photo',
                    'layout' => $layout,
                    'styles' => $styles,
                    'preview' => $preview,
                    'employer' => $employer
                )
            );
            echo '<div class="sortable-box">';
            foreach ($blocks_order as $block) {
                $visible = $styles[$block . '_visible'];
                if (($visible == '1' || $preview)) {
                    Shortcode::include_block(
                        array(
                            'block' => $block,
                            'layout' => $layout,
                            'styles' => $styles,
                            'preview' => $preview,
                            'employer' => $employer
                        )
                    );
                }
            }
            echo '</div>';
            echo '</div>';

            if ($panel && !$preview) {
                $panel_theme = $styles['panel_theme'];
                include($base . 'public/partials/parts/panels/' . $panel_theme . '.php');
            }

            echo '</li>';
        endforeach;
    endif;

    echo '</ul>';
    echo '</div>';
    echo Shortcode::$ad;
    ?>
    <?php if (!$preview): ?>
        <script type="text/javascript">
            // paint all even && visible rows with background color
            jQuery(document).ready(function ($) {
                ATS.paint_rows(<?php echo $this->data->ID?>);
                $('[team-id="' + <?php echo $this->data->ID?> + '"].employers-box > li').on('cssClassChanged', function (e) {
                    ATS.paint_rows(<?php echo $this->data->ID?>);
                });
            });
        </script>
    <?php endif; ?>
    <?php if (!$panel && !$preview): ?>
        <script type="text/javascript">
            // handle click on employer to open profile url
            jQuery(document).ready(function ($) {
                ATS.bind_profiles(<?php echo $this->data->ID?>);
            });
        </script>
    <?php endif; ?>
    <?php if (!$preview): ?>
        <script type="text/javascript">
            (function ($) {
                $(function () {
                    ATS.calc_rating_icons_size(<?php echo $this->data->ID?>);
                    ATS.calc_social_icons_size(<?php echo $this->data->ID?>);
                });
            }(jQuery));
        </script>
    <?php endif; ?>
    <?php if ($panel == 1 && !$preview): ?>
        <script type="text/javascript">
            (function ($) {
                $(function () {
                    ATS.init_panel(<?php echo $this->data->ID?>, '<?php echo $panel_animation; ?>');
                });
            }(jQuery));
        </script>
    <?php endif; ?>