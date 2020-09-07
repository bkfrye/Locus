<?php
    use TeamBuilder\App\Model\Employer;
    use TeamBuilder\App\Shortcode;

    $base = LA_Team_Builder::$plugin['base'];
    $id = $this->data->ID;
    $layout = 'grid';
    $class = '';
    $slider_class = '';
    $hover_class = '';
    $layout_css = $this->data->custom_css ?: '';

    $preview = $this->data->preview;
    $styles = $this->data->styles[$layout] ?: $this->data->custom_fields['styles'][$layout];

    $reveal = $styles['reveal'];
    $hover = $styles['hover'];
    if ($hover != 'off') {
        $hover_class = 'ats-effect-' . $hover;
    }

    include($base . 'public/partials/parts/buttons_css.php');

    $slider = $styles['slider'];
    $slider_autoplay = $styles['slider_autoplay'];
    $slider_autoplay_speed = esc_html($styles['slider_autoplay_speed']);
    $slider_adaptive = $styles['slider_adaptive'];

    $panel = $styles['panel'];
    $panel_animation = $styles['panel_animation'];

    $gaps = preg_replace('/[^0-9]/', '', $styles['gaps']); // clear value from non-numeric characters
    $margin_left = 'margin-left: ' . $gaps / 2 . 'px';
    $margin_right = 'margin-right: ' . $gaps / 2 . 'px';
    $margin_top = 'margin-top: ' . $styles['gaps'];
    $margin = 'margin: 0 ' . $gaps / 2 . 'px ' . $gaps . 'px';
    $margin_fix = 'margin: 0 -' . $gaps / 2 . 'px -' . $gaps / 2 . 'px';
    $width_fix = 'width: calc(100% + ' . $gaps . 'px)';
    $layout_align = 'text-align: ' . $styles['align'];
    $photo_size = $styles['photo_size'];

    $card_gaps = 'padding:  ' . Shortcode::get_size($styles['card_gaps']);
    $body_visible = $styles['body_visible'];
    $card_columns = 'a-grid-' . $styles['card_width'];

    $card_base_color = '';
    $card_border_color = '';
    $card_shadow_color = '';

    if ($body_visible == '1') {
        $card_base_color = 'background-color: ' . $styles['card_base_color'];
        $card_border_color = 'border: 1px solid ' . $styles['card_border_color'];
        $card_shadow_color = 'box-shadow: 0 0 5px 0 ' . $styles['card_shadow_color'];
    }

    $blocks_order = $styles['blocks_order'];

    if ($styles['photo_size'] == 'a-full') {
        $class = 'a-full';
        $layout_css .= '#ats-layout-' . $id . ' .sortable-box.a-full .employer_photo + .grid-container{padding-top: ' . Shortcode::get_size($styles['card_gaps']) . '}';
        $layout_css .= '#ats-layout-' . $id . ' .sortable-box.a-full .grid-container ~ .employer_photo{padding-top: ' . Shortcode::get_size($styles['card_gaps']) . '}';
    }
    if ($slider == '1' && !$preview) {
        $slider_class = ' slider-enabled ';
    }

    echo Shortcode::$ad;
    echo '<div class="ats-layout-grid ats-layout ' . $hover_class . '"
                    id="ats-layout-' . $this->data->ID . '">';
    echo '<style type="text/css">' . $layout_css . '</style>';

    include($base . 'public/partials/parts/team-information.php');
    include($base . 'public/partials/parts/filter.php');
    if($styles['filter'] != '1') {
        include($base.'public/partials/parts/search.php');
    }

    echo "<ul team-id='" . $this->data->ID . "' class='$slider_class employers-box filter-container' style='
                    $width_fix;
                    $layout_align;
                    $margin_fix;'
                    >";
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

            echo "<li class='$card_columns $terms filter-item' style='' employer-id='$id' data-title='$name'>";
            echo "<div $clicable data-profile='$profile'
                        class='sortable-box $class'
                        title='$profile_title'
                        style='
                        $card_base_color;
                        $card_border_color;
                        $card_shadow_color;
                        $card_gaps;
                        $margin;'>";

            foreach ($blocks_order as $block) {
                $visible = $styles[$block . '_visible'];
                if (($visible == '1' || $preview)) {
                    Shortcode::include_block(
                        array(
                            'block' => $block,
                            'layout' => $layout,
                            'styles' => $styles,
                            'preview' => $preview,
                            'employer' => $employer,
                            'id' => $id
                        )
                    );
                }
            }
            echo '</div>';
            if ($panel == '1' && !$preview) {
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
    <?php if (!$preview && $reveal == 1): ?>
        <script id="ats-dynamic-script-<?php echo $this->data->ID ?>">
            jQuery(document).ready(function ($) {
                ATS.init_animations('<?php echo $this->data->ID?>');
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
    <?php if ($panel == 1 && !$preview): ?>
        <script type="text/javascript">
            (function ($) {
                $(function () {
                    ATS.init_panel(<?php echo $this->data->ID?>, '<?php echo $panel_animation; ?>');
                });
            }(jQuery));
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
    <?php if ($slider == '1' && !$preview): ?>
        <script type="text/javascript">
            jQuery(document).ready(function($){
                var slider_options = {
                    count: <?php echo $styles['card_width']; ?>,
                    autoplay: <?php echo $slider_autoplay; ?>,
                    speed: <?php echo $slider_autoplay_speed; ?>,
                    adaptive: <?php echo $slider_adaptive; ?>,
                }
                ATS.enable_slider(<?php echo $this->data->ID; ?>, slider_options);
            });
        </script>
    <?php endif; ?>
    <?php
    include_once($base . 'public/partials/parts/svg.html');