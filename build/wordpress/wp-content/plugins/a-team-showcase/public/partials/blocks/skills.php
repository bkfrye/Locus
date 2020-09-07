<?php
    use TeamBuilder\App\Shortcode;

    $font_size = 'font-size: ' . $styles['skills_font_size'];
    $color = 'color: ' . $styles['skills_text_color'];
    $bold = $styles['skills_bold'] == '1' ? 'font-weight: ' . 'bold' : 'font-weight: ' . 'normal';
    $italic = $styles['skills_italic'] == '1' ? 'font-style: ' . 'italic' : 'font-style: ' . 'normal';
    $text_transform = 'text-transform: ' . $styles['skills_text_transform'];

    $text_color = 'color: ' . $styles['skills_text_color'];
    $bar_color = $styles['skills_bar_color'];
    if(isset($styles['skills_size'])){
        $size = Shortcode::get_size($styles['skills_size']);
    }
    $align = 'text-align:' . $styles['skills_align'];
    $top_margin = '';
    if(isset($styles['skills_top_margin'])){
        $top_margin = 'margin-top: ' . Shortcode::get_size($styles['skills_top_margin']);
    }

    $templates = array(
        'percent'   => '<span style="%s %s %s" class="value"></span>',
        'star'      => '<svg style="%s %s %s" class="icon icon-star" viewBox="0 0 1024 1024"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-star-full"></use></svg>'
    );

    if(!empty($employer->skills)){
        $skills = $employer->skills;

        echo "<div class='employer_skills $layout-container sortable'
                style='
                $align;
                $top_margin;
                $font_size;
                $color;
                $bold;
                $italic;
                $text_transform;
                $text_color;
                '
                data-block-name='skills'
                data-tooltip-name='skills'>";

        echo "<ul class='team-field-content'>";
            foreach($skills as $skill){
                $type = $styles['skills_type'];
                $value = esc_html($skill['value']);
                $skill_value_width = 'width: 100%';
                $html = '';
                if($type == 'percent' || $preview){
                    $data = array(
                        'width:' . $value . '%;',
                        'height:' . $size . ';',
                        'background-color:' . $bar_color . ';',
                    );
                    $html = '<div class="skills-percent">';
                    $html .= vsprintf($templates['percent'], $data);
                    $html .= '</div>';
                }
                if($type == 'star' || $preview){
                    $skill_value_width = 'width: ' . $size * 5 . 'px';
                    $data = array(
                        'width:' . $size . ';',
                        'height:' . $size . ';',
                        'color:' . $bar_color . ';',
                    );
                    $width = 'width:' . $size * 5 * $value / 100 . 'px';
                    $html .= '<div class="skills-star star-background">';
                    for($i = 0; $i < 5; $i++){
                        $html .= vsprintf($templates['star'], $data);
                    }
                    $html .= '</div>';
                    $html .= '<div class="skills-star star-fill" style="' . $width . '">';
                    for($i = 0; $i < 5; $i++){
                        $html .= vsprintf($templates['star'], $data);
                    }
                    $html .= '</div>';
                }

                echo '<li data-rating="' . $value . '">';
                echo '<div class="skill-name">' . esc_html($skill['name']) . '</div>';
                echo "<div class='skill-value skill-value-$type' style='$skill_value_width'>$html</div>";
                echo '</li>';
            }
        echo '</ul>';

        if($preview){
            include($base . 'public/partials/parts/tooltip-button.php');
        }
        echo '</div>';
    }else{
        echo '<div class="sortable"></div>';
    }

