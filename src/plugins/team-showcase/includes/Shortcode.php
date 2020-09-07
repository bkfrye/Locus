<?php

namespace TeamBuilder\App;

use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Team;
use LooksAwesome\Common\Render;

class Shortcode{

    private $layout = '';
    private $team = null;
    public static $ad = '<!-- Team Builder by Looks Awesome: http://team.looks-awesome.com -->';
    private static $plugin_name;
    private static $mode;

    public function __construct()
    {
        $env = null;
        if (file_exists(plugin_dir_path(__DIR__) . 'env.json')) {
            $env = json_decode(file_get_contents(plugin_dir_path(__DIR__) . 'env.json'), true);
        }

        self::$plugin_name = \LA_Team_Builder::$plugin['name'];
        self::$mode = $env['mode'] ?: 'dev';
        add_shortcode('a-team-showcase', array($this, 'render')); // set Awesome Team shortcode
        add_shortcode('a-team-showcase-vc', array($this, 'render_vc')); // set Visual Composer shortcode
    }

    public function render_vc($atts){
        extract(
            shortcode_atts(
                array('ats_team_id' => ''),
                $atts
            )
        );

        $shortcode = '';

        if($ats_team_id !== 'null'){
            $shortcode = '[a-team-showcase id="' . $ats_team_id . '"]';
        }

        return do_shortcode($shortcode);
    }

    /**
     * Decode team post meta field shortcode
     *
     * @param $id
     * @param bool $preview
     * @return array
     */

    public function set_team($id, $preview = false)
    {
        $post = Team::find($id);
        return $this->team = $this->decode($post, $preview);
    }

    /**
     * @param null $layout
     */
    public function set_layout($layout = null)
    {
        $layout = isset($layout) ? $layout : $this->team->layout;
        $s = DIRECTORY_SEPARATOR;
        $this->layout = WP_PLUGIN_DIR . $s . self::$plugin_name . $s . 'public' . $s . 'partials' . $s . $layout . '.php';
    }


    public function enqueue_all()
    {
        if (self::$mode == 'dev') {
            wp_enqueue_style(self::$plugin_name . '-shortcode');
            wp_enqueue_style(self::$plugin_name . '-panel');
            wp_enqueue_style(self::$plugin_name . '-font-awesome');
            wp_enqueue_style(self::$plugin_name . '-slick-carousel-theme');
            wp_enqueue_style('slick-carousel');
            wp_enqueue_style('awesome-panel');

            wp_enqueue_script('slick-carousel');
            wp_enqueue_script('awesome-filter');
            wp_enqueue_script('awesome-viewport');
            wp_enqueue_script('awesome-panel');
            wp_enqueue_script('awesome-util');
            wp_enqueue_script(self::$plugin_name . '-shortcode');
        } else {
            wp_enqueue_style(self::$plugin_name . '-font-awesome');
            wp_enqueue_style(self::$plugin_name . '-all');
            wp_enqueue_script(self::$plugin_name . '-all');
        }
    }

    /**
     * @return string
     */
    public function get_layout_html()
    {
        $view = new Render($this->layout, $this->team); // layout = array(grid, table, slider) || template = class for shortcode root element
        return $view->render();
    }

    public static function hex_to_rgb($hex)
    {
        if (strlen($hex) == 0) {
            return '';
        }
        $hex = str_replace('#', '', $hex);
        if (strlen($hex) == 3) {
            $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
            $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
            $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
        }
        if (strlen($hex) == 6) {
            $r = hexdec(substr($hex, 0, 2));
            $g = hexdec(substr($hex, 2, 2));
            $b = hexdec(substr($hex, 4, 2));
        }
        $rgb = array($r, $g, $b);
        return implode(', ', $rgb);
    }

    /**
     * @param $post
     * @param $preview
     * @return WP_Post
     */
    public function decode($post, $preview)
    {

        if (null == $post) {
            return false;
        }


        $post = Team::setDefaults($post);
        $post->filter_terms = array();
        $employers_ids = $post->employers;
        $option_order_by = esc_html($post->order_by);
        $option_order_direction = esc_html($post->order_direction);

        if ($preview) {
            $post->preview = true;
        }

        if (!empty($employers_ids)) {
            $post->employers = array();
            $post->filter_terms = wp_get_object_terms(
                $employers_ids,
                Employer::getTaxonomy()
            );

            if($option_order_by == 'title'){
                $order_by = 'title';
            }
            if($option_order_by == 'custom'){
                $order_by = 'post__in';
            }
            if($option_order_by == 'publish_date'){
                $order_by = 'date';
            }
            if($option_order_by == 'random'){
                $order_by = 'rand';
            }

            $employers = Employer::where(
                array(
                    'post_type' => Employer::$post_type,
                    'post__in' => $employers_ids,
                    'orderby' => $order_by,
                    'no_found_rows' => true,
                    'numberposts' => -1,
                    'posts_per_page' => -1,
                    'order' => $option_order_direction
                )
            );

            foreach ($employers as $employer) {
                $post->employers[] = $employer;
            }
        }

        if ($preview) {
            $post->employers = array();

            $post->employers[0] = new \stdClass;
            $post->employers[0]->ID = 0;
            $post->employers[0]->post_title = 'John Doe';
            $post->employers[0]->position = 'CEO';
            $post->employers[0]->post_excerpt = 'Lorem ipsum dolor sit amet';
            $post->employers[0]->email = 'john@acme.com';
            $post->employers[0]->phone = '555-5555-5555';
            $post->employers[0]->skype = 'john_doe';
            $post->employers[0]->link = 'http://domain.com';
            $post->employers[0]->location = 'Madagascar';
            $post->employers[0]->profile = '';
            $post->employers[0]->facebook = 'http://facebook.com';
            $post->employers[0]->twitter = 'http://facebook.com';
            $post->employers[0]->linkedin = 'http://facebook.com';
            $post->employers[0]->google = 'http://google.com';
            $post->employers[0]->instagram = 'http://instagram.com';
            $post->employers[0]->youtube = 'http://youtube.com';
            $post->employers[0]->pinterest = '';
            $post->employers[0]->vimeo = '';
            $post->employers[0]->dribble = '';
            $post->employers[0]->flickr = '';
            $post->employers[0]->github = '';
            $post->employers[0]->skills = array(
                array(
                    'name' => 'Photoshop',
                    'value' => 80
                )
            );
        }

        return $post;
    }

    /**
     * Render shortcode preview for admin area
     *
     * @param $post
     * @param $layout
     * @return mixed
     */
    public function preview($post, $layout)
    {
        if ($this->team == null) {
            $this->team = $this->decode($post, true);
        }
        $this->set_layout($layout);
        $html = $this->get_layout_html();
        return $html;
    }


    /**
     * Render shortcode on frontend
     *
     * @param $atts
     * @return mixed
     */
    public function render($atts)
    {
        // enqueue scripts & styles only if shortcode included on page
        $args = shortcode_atts(array(
            'id' => ''
        ), $atts);

        if ($this->set_team($args['id'])) {
            $this->set_layout();
            $this->enqueue_all();
            return $this->get_layout_html();
        } else {
            return false;
        }
    }

    /**
     * Include block for layout
     */
    public static function include_block($atts){
        $defaults = array(
            'force_visible' => false
        );
        $atts = $atts + $defaults;
        extract($atts);
        $base = plugin_dir_path(dirname(__FILE__));

        if(isset($styles[$block . '_visible'])){
            $visible = $styles[$block . '_visible'];
            $common_path = $base . "public/partials/blocks/$block.php";
            $special_path = $base . "public/partials/blocks/$layout/$block.php";
            if ($visible == '1' || $preview || $force_visible) {
                if (file_exists($special_path)) {
                    include($special_path);
                    return;
                }
                if (file_exists($common_path)) {
                    include($common_path);
                    return;
                }
            }
        }
    }

    public static function get_image_sizes($size = '')
    {
        global $_wp_additional_image_sizes;

        $sizes = array();
        $get_intermediate_image_sizes = get_intermediate_image_sizes();

        // Create the full array with sizes and crop info
        foreach ($get_intermediate_image_sizes as $_size) {
            if (in_array($_size, array('thumbnail', 'medium', 'large'))) {
                $sizes[$_size][0] = get_option($_size . '_size_w');
                $sizes[$_size][1] = get_option($_size . '_size_h');
                //$sizes[ $_size ][2] = (bool) get_option( $_size . '_crop' );
                $sizes[$_size][2] = true;
            } elseif (isset($_wp_additional_image_sizes[$_size])) {
                $sizes[$_size] = array(
                    $_wp_additional_image_sizes[$_size]['width'],
                    $_wp_additional_image_sizes[$_size]['height'],
                    $_wp_additional_image_sizes[$_size]['crop']
                );

            }

        }

        // Get only 1 size if found
        if ($size) {

            if (isset($sizes[$size])) {
                return $sizes[$size];
            } else {
                return false;
            }

        }

        return $sizes;
    }

    /**
     * Get size in pixels or %
     * @param $raw
     * @return string
     */
    public static function get_size($raw)
    {
        if (substr($raw, -1) == '%') {
            return $raw;
        }
        if (substr($raw, -2) == 'px') {
            return $raw;
        }
        $result = preg_replace('/[^0-9]/', '', $raw);
        return $result . 'px';
    }
}