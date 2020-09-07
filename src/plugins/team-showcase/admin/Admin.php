<?php

namespace TeamBuilder\Back;

use LooksAwesome\Common\Render;
use LooksAwesome\Common\FieldsFactory;
use TeamBuilder\App\Model\Settings;
use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Team;

class Admin {
    private static $plugin_name;
    private static $plugin_label;
    private static $prefix;
    private static $version;

    /**
     * Plugin running mode. By default is dev
     */
    private static $mode;
    private static $capabilities;
    private static $dir;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
        $env = null;
        if(file_exists(plugin_dir_path(__DIR__) . 'env.json')){
            $env = json_decode(file_get_contents(plugin_dir_path(__DIR__) . 'env.json'), true);
        }

        $settings = new Settings();

        self::$plugin_name = \LA_Team_Builder::$plugin['name'];
        self::$plugin_label = \LA_Team_Builder::$plugin['label'];
        self::$version = \LA_Team_Builder::$plugin['version'];
        self::$prefix = \LA_Team_Builder::$plugin['prefix'];
        self::$mode = array_key_exists('mode', $env) ? $env['mode'] : 'dev';
        self::$capabilities = array_key_exists('capabilities', $env) ? $env['capabilities'] : 'manage_options';
        self::$capabilities = $settings::get('capabilities') ?: self::$capabilities;
        self::$dir  = plugin_dir_url(__FILE__);
        // add menu item to admin sidebar
        add_action('admin_menu', array($this, 'add_admin_menu'));
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in A_Team_Showcase_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The A_Team_Showcase_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */


		if ( ! isset( $this->plugin_screen_hook_suffix ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( $this->plugin_screen_hook_suffix == $screen->id ) {
            if(self::$mode == 'dev') {
                /* Awesome default theme */
                wp_enqueue_style('awesome-theme', self::$dir . 'css/vendor/awesome/theme.css', array(), '1.0', 'all');
                /* Bootstrap styles */
                wp_enqueue_style('bootstrap', self::$dir . 'css/vendor/bootstrap/bootstrap.css', array(), '3.3.5', 'all');
                wp_enqueue_style('a-bootflat', self::$dir . 'css/vendor/bootstrap/bootflat.css', array(), '2.0.4', 'all');
                wp_enqueue_style('color-picker', self::$dir . 'css/vendor/bootstrap/bootstrap-colorpicker.css', array(), '2.0.4', 'all');
                wp_enqueue_style('selectize', self::$dir . 'css/vendor/selectize/selectize.css', array(), '2.0.4', 'all');
                /* Formstone */
                wp_enqueue_style('formstone-dropdown', self::$dir . 'css/vendor/formstone/dropdown.css', array(), '0.7.0', 'all');
                wp_enqueue_style('formstone-lightbox', self::$dir . 'css/vendor/formstone/lightbox.css', array(), '0.7.0', 'all');
                /* Slide panel */
                wp_enqueue_style('awesome-panel', self::$dir . 'css/vendor/awesome/panel.css', array(), self::$version, 'all');
                /* Plugin styles */
                wp_enqueue_style(self::$plugin_name, self::$dir . 'css/style.css', array(), self::$version, 'all');
                /* Shortcode styles */
                wp_enqueue_style(self::$plugin_name . '-shortcode', plugin_dir_url(__DIR__) . 'public/css/style.css', array(), self::$version, 'all');
            }else{
                wp_enqueue_style(self::$plugin_name . '-all', self::$dir . 'css/all.min.css', array(), self::$version, 'all');
            }
            wp_enqueue_style(self::$plugin_name . '-font-awesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css', array(), self::$version, 'all');
            wp_enqueue_style('font-montserrat', 'https://fonts.googleapis.com/css?family=Montserrat:400,700', array(), self::$version, 'all');
            wp_enqueue_style('font-noto-sans', 'https://fonts.googleapis.com/css?family=Noto+Sans:400,400italic,700,700italic', array(), self::$version, 'all');
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in A_Team_Showcase_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The A_Team_Showcase_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		if ( ! isset( $this->plugin_screen_hook_suffix ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( $this->plugin_screen_hook_suffix == $screen->id ) {
            if(self::$mode == 'dev') {
                /* Register plugin scripts */
                wp_register_script('awesome-util', self::$dir . 'js/vendor/awesome/util.js', array('jquery'), self::$version, false);
                wp_register_script(self::$plugin_name . '-main', self::$dir . 'js/app/main.js', array('jquery', 'underscore', 'backbone', 'awesome-util'), self::$version, false);

                /* Vendor libs */
                wp_register_script('backbone-nested', self::$dir . 'js/vendor/backbone/backbone.nested.js', null, self::$version, false);
                wp_register_script('backbone-stickit', self::$dir . 'js/vendor/backbone/backbone.stickit.js', null, self::$version, false);
                wp_register_script('formstone', self::$dir . 'js/vendor/formstone/core.js', null, self::$version, false);
                wp_register_script('formstone-touch', self::$dir . 'js/vendor/formstone/touch.js', array('formstone'), self::$version, false);
                wp_register_script('formstone-transition', self::$dir . 'js/vendor/formstone/transition.js', array('formstone'), self::$version, false);
                wp_register_script('formstone-dropdown', self::$dir . 'js/vendor/formstone/dropdown.js', array('formstone'), self::$version, false);
                wp_register_script('formstone-lightbox', self::$dir . 'js/vendor/formstone/lightbox.js', array('formstone'), self::$version, false);
                wp_register_script('bootstrap-colorpicker', self::$dir . 'js/vendor/bootstrap/bootstrap-colorpicker.min.js', null, self::$version, false);
                wp_register_script('selectize', self::$dir . 'js/vendor/selectize/selectize.js', null, self::$version, false);
                wp_register_script('awesome-panel', self::$dir . 'js/vendor/awesome/panel.js', array('jquery'), self::$version, false);
                wp_register_script('awesome-ajax', self::$dir . 'js/vendor/awesome/ajax.js', array('jquery'), self::$version, false);

                /* App models */
                wp_register_script(self::$plugin_name . '-model-teams', self::$dir . 'js/models/teams.js', array('backbone-nested'), self::$version, false);
                wp_register_script(self::$plugin_name . '-model-employers', self::$dir . 'js/models/employers.js', array('backbone-nested'), self::$version, false);

                /* App modules */
                wp_register_script(self::$plugin_name . '-drag-n-drop', self::$dir . 'js/app/drag-n-drop.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-ajax', self::$dir . 'js/app/ajax.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-form', self::$dir . 'js/app/form.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-tooltip', self::$dir . 'js/app/tooltip.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-animation', self::$dir . 'js/app/animation.js', null, self::$version, false);

                /* App actions */
                wp_register_script(self::$plugin_name . '-team-actions', self::$dir . 'js/app/team-actions.js', array('awesome-panel'), self::$version, false);
                wp_register_script(self::$plugin_name . '-employer-actions', self::$dir . 'js/app/employer-actions.js', array('awesome-panel'), self::$version, false);
                wp_register_script(self::$plugin_name . '-settings-actions', self::$dir . 'js/app/settings-actions.js', array('awesome-panel'), self::$version, false);

                /* App views */
                wp_register_script(self::$plugin_name . '-settings', self::$dir . 'js/views/settings.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-settings-form', self::$dir . 'js/views/settings/form.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team', self::$dir . 'js/views/team.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-form', self::$dir . 'js/views/team/form.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-preview', self::$dir . 'js/views/team/preview.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-tooltip-photo', self::$dir . 'js/views/team/tooltip-photo.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-tooltip-font', self::$dir . 'js/views/team/tooltip-font.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-tooltip-divider', self::$dir . 'js/views/team/tooltip-divider.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-tooltip-social', self::$dir . 'js/views/team/tooltip-social.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-team-tooltip-skills', self::$dir . 'js/views/team/tooltip-skills.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-employer', self::$dir . 'js/views/employer.js', null, self::$version, false);
                wp_register_script(self::$plugin_name . '-employer-form', self::$dir . 'js/views/employer/form.js', null, self::$version, false);


                /* Enqueue all this shit */
                wp_enqueue_script(self::$plugin_name . '-system');
                wp_enqueue_script(self::$plugin_name . '-main');

                wp_enqueue_script('backbone-nested');
                wp_enqueue_script('backbone-stickit');
                wp_enqueue_script('formstone');
                wp_enqueue_script('formstone-touch');
                wp_enqueue_script('formstone-transition');
                wp_enqueue_script('formstone-dropdown');
                wp_enqueue_script('formstone-lightbox');
                wp_enqueue_script('bootstrap-colorpicker');
                wp_enqueue_script('selectize');
                wp_enqueue_script('awesome-panel');
                wp_enqueue_script('awesome-ajax');

                wp_enqueue_script(self::$plugin_name . '-model-teams');
                wp_enqueue_script(self::$plugin_name . '-model-employers');
                wp_enqueue_script(self::$plugin_name . '-drag-n-drop');
                wp_enqueue_script(self::$plugin_name . '-ajax');
                wp_enqueue_script(self::$plugin_name . '-form');
                wp_enqueue_script(self::$plugin_name . '-tooltip');
                wp_enqueue_script(self::$plugin_name . '-animation');
                wp_enqueue_script(self::$plugin_name . '-team-actions');
                wp_enqueue_script(self::$plugin_name . '-employer-actions');
                wp_enqueue_script(self::$plugin_name . '-settings-actions');
                wp_enqueue_script(self::$plugin_name . '-settings');
                wp_enqueue_script(self::$plugin_name . '-settings-form');
                wp_enqueue_script(self::$plugin_name . '-team');
                wp_enqueue_script(self::$plugin_name . '-team-form');
                wp_enqueue_script(self::$plugin_name . '-team-preview');
                wp_enqueue_script(self::$plugin_name . '-team-tooltip-photo');
                wp_enqueue_script(self::$plugin_name . '-team-tooltip-font');
                wp_enqueue_script(self::$plugin_name . '-team-tooltip-divider');
                wp_enqueue_script(self::$plugin_name . '-team-tooltip-social');
                wp_enqueue_script(self::$plugin_name . '-team-tooltip-skills');
                wp_enqueue_script(self::$plugin_name . '-employer');
                wp_enqueue_script(self::$plugin_name . '-employer-form');

                wp_localize_script( 'awesome-ajax', self::$prefix . '_localize', array(
                    'ajax_nonce'        => wp_create_nonce( self::$plugin_name),
                    'ajaxurl'           => admin_url( 'admin-ajax.php' ),
                    'default_avatar'    => plugin_dir_url(__DIR__) . 'admin/img/default-avatar.png'
                ));
            }else{
                wp_register_script('all', self::$dir . 'js/all.min.js', array('jquery', 'underscore', 'backbone'), self::$version, false);
                wp_enqueue_script('all');
                wp_localize_script( 'all', self::$prefix . '_localize', array(
                    'ajax_nonce'        => wp_create_nonce( self::$plugin_name),
                    'ajaxurl'           => admin_url( 'admin-ajax.php' ),
                    'default_avatar'    => plugin_dir_url(__DIR__) . 'admin/img/default-avatar.png'
                ));
            }

            // Include WP libraries
            wp_enqueue_media();
            wp_enqueue_script( 'wp-ajax-response' );
		}
	}

    /**
     * Register menu in admin area
     */
    public function add_admin_menu(){

        $wp_version = (float) get_bloginfo('version');
        if($wp_version > 3.8){ // From 3.8 WP supports SVG icons
            $icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPiAgICAgICAgPHRpdGxlPnNpZGViYXJfd3BfaWNvbjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPiAgICAgICAgPGcgaWQ9InNpZGViYXJfd3BfaWNvbiIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgZmlsbD0iIzlFQTNBOCI+ICAgICAgICAgICAgPHBhdGggZD0iTTQuMzczNDk3MTksMTAuNjAyNTQzOSBMNC4wMDUzMzcxNiwxMi42NTczOTA2IEMzLjk4NTQ0Nzg4LDEyLjc3MDY2NDggNC4wMjE3NDEwOCwxMi44ODY1NTMgNC4xMDQyOTEwNiwxMi45NjcyMDg3IEM0LjE4NjY4OTUsMTMuMDQ3OTQwMiA0LjMwMzE4Mzg1LDEzLjA4MjQxNSA0LjQxNjUzMzgsMTMuMDYwMTM5IEw2LjQ2MzU3NjI4LDEyLjY0OTM5NyBDNi41MzI2Mzk0NCwxMi42MzU1NjkyIDYuNTk1MTEwNzIsMTIuNjAxNDM1NCA2LjY0NDI4NDU5LDEyLjU1MTgwNjkgTDcuNDcyNzc3MjQsMTEuNzA2MzA0MiBMOC4xNzEzNjQ0OSw2LjYzOTcyODIgTDQuNDY4MjQ1OTMsMTAuNDIwNjk5MSBDNC40MTg0MjgwMiwxMC40NzAyODk3IDQuMzg1NjU4MDYsMTAuNTM0MDExMSA0LjM3MzQ5NzE5LDEwLjYwMjU0MzkgWiBNMTQuNTA2ODM4Niw0LjQ4MTgzNjEzIEw5LjcyMjc2NjE0LDQuNDgxODM2MTMgTDguMjM0NTE3NjksMTUuMjc1MDA5MSBDOC4yMTI1ODI2NiwxNS40MzMyMTQxIDguMjYxNzE4NjUsMTUuNTkzMzEzNCA4LjM2OTEyMDc1LDE1LjcxMjE1NjUgTDExLjcxMDg2MDYsMTkuNDMwNTA0NiBDMTEuODE0MDU3NSwxOS41NDQ1MzY1IDExLjk2MDc4MzYsMTkuNjEwMDAwNiAxMi4xMTQ4MjEzLDE5LjYxMDAwMDYgQzEyLjI2ODg1OSwxOS42MTAwMDA2IDEyLjQxNTU4NTEsMTkuNTQ0NDk4NiAxMi41MTg3ODIsMTkuNDMwNTA0NiBMMTUuODYxMDUyMywxNS43MTIxNTY1IEMxNS45Njg0MTY1LDE1LjU5MzMxMzQgMTYuMDE2OTA4NCwxNS40MzMyMTQxIDE1Ljk5NTEyNDksMTUuMjc1MDA5MSBMMTQuNTA2ODM4Niw0LjQ4MTgzNjEzIFogTTkuNjM3ODI5NDUsMy4yMzk3OTgwMSBMOS42OTg2MzM4MiwzLjQ5MTQ2MzY5IEwxNC41MzEwMDg4LDMuNDkxNDYzNjkgTDE0LjU5MTY2MTcsMy4yMzk3OTgwMSBMMTQuNzk2NjkxNywyLjM5NzMyNjAzIEMxNC44NzgwNjczLDIuMDYwMTU1NCAxNC44MDA0MDQ0LDEuNzA0MTU2MjUgMTQuNTg2MjgyMSwxLjQzMTcyOTk1IEMxNC4zNzIxNTk4LDEuMTU4ODQ5MDQgMTQuMDQ0MDQzNSwxIDEzLjY5NzE3NDUsMSBMMTAuNTMyNTQzOSwxIEMxMC4xODU1MjM0LDEgOS44NTc0MDcwOSwxLjE1ODg0OTA0IDkuNjQzNDM2MzMsMS40MzE3Mjk5NSBDOS40MjkzMTQwNCwxLjcwNDE1NjI1IDkuMzUxNjUxMTQsMi4wNjAxNTU0IDkuNDMyODc1MTYsMi4zOTczMjYwMyBMOS42Mzc4Mjk0NSwzLjIzOTc5ODAxIFoiIGlkPSJ0aWUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==';
        }else{
            $icon = 'dashicons-universal-access';
        }

        $this->plugin_screen_hook_suffix = add_menu_page(
            self::$plugin_label, // Plugin Display Name
            self::$plugin_label, // Menu Item
            self::$capabilities, // Capabilities
            self::$plugin_name, // Slug
            array($this, 'display_admin_index'), // method to display admin index page
            $icon, // menu icon
            21
        );
    }

    /**
     * Display main admin page
     */
    public function display_admin_index(){
        $template = plugin_dir_path(__FILE__) . 'partials/display.php';

        $team_tooltip_fields = new FieldsFactory('team', '{{field_name}}');
        $team_panel_fields = new FieldsFactory('team', '');

        $employers = Employer::all();
        $teams = Team::all();

        if (sizeof($teams) !== 0) {
            foreach ($teams as $team) {
                if (!empty($team->employers)) {
                    $team_employers = Employer::where(
                        array(
                            'post_type' => Employer::$post_type,
                            'post__in' => $team->employers,
                            'orderby' => 'post__in',
                            'post_count' => -1,
                            'posts_per_page' => -1
                        )
                    );
                    $team->employers = $team_employers;
                } else {
                    $team->employers = array();
                }
            }
        } else {

        }

        $data = array(
            'teams' => $teams,
            'team_tooltip_fields' => $team_tooltip_fields,
            'team_panel_fields' => $team_panel_fields,
            'employers' => $employers
        );

        $view = new Render($template, $data);
        echo $view->render();
    }
}