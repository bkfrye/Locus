<?php


use TeamBuilder\App\Ajax;
use TeamBuilder\App\Loader;
use TeamBuilder\App\Translate;
use TeamBuilder\App\Model\Team;
use TeamBuilder\App\Model\Employer;
use TeamBuilder\Back\Admin;
use TeamBuilder\Front\Frontend;
use LooksAwesome\Common\Editor;

class LA_Team_Builder_App_Plugin
{

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      A_Team_Showcase_Loader $loader Maintains and registers all hooks for the plugin.
     */
    protected $loader;
    public static $plugin;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct($args)
    {
        $this->define_static_vars($args);
        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
        $this->define_image_sizes();
        $this->loader->run();
    }

    protected function define_static_vars($args)
    {
        foreach ($args as $key => $value) {
            static::$plugin[$key] = $value;
        }
    }

    public function define_image_sizes()
    {
        add_image_size('a-full', 1000, 1000, true);
        add_image_size('a-large', 600, 600, true);
        add_image_size('a-medium', 300, 300, true);
        add_image_size('a-thumbnail', 150, 150, true);
        add_image_size('a-small', 50, 50, true);

        add_filter('image_size_names_choose', array($this, 'media_custom_sizes'));
    }

    public function media_custom_sizes($sizes)
    {
        return array_merge(
            $sizes,
            array(
                'a-thumbnail' => __('Awesome thumbnail'),
            )
        );
    }

    /**
     * Register custom post types on plugin activation
     */
    public function register_custom_post_types()
    {
        // labels for custom admin UI
        Employer::register_post_type();
        Employer::register_taxonomy();
        Team::register_post_type();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - A_Team_Showcase_Loader. Orchestrates the hooks of the plugin.
     * - A_Team_Showcase_i18n. Defines internationalization functionality.
     * - A_Team_Showcase_Admin. Defines all hooks for the admin area.
     * - A_Team_Showcase_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies()
    {
        $this->loader = new Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the A_Team_Showcase_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale()
    {
        $plugin_i18n = new Translate();
        $plugin_i18n->set_domain(self::$plugin['name']);

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');

    }

    private function define_ajax_hooks()
    {
        // Employer REST
        $ajax_class = new Ajax();
        $this->loader->add_action(
            'wp_ajax_ats_update_or_new_employer',
            $ajax_class,
            'ajax_handle_update_or_new_employer'
        );
        $this->loader->add_action('wp_ajax_ats_get_employer', $ajax_class, 'ajax_handle_get_employer');

        // Team REST
        $this->loader->add_action('wp_ajax_ats_update_or_new_team', $ajax_class, 'ajax_handle_update_or_new_team');
        $this->loader->add_action('wp_ajax_ats_get_team', $ajax_class, 'ajax_handle_get_team');

        // Save Settings
        $this->loader->add_action('wp_ajax_'.self::$plugin['prefix'].'_update_settings', $ajax_class, 'ajax_handle_update_settings');

        // Universal action to delete any model
        $this->loader->add_action('wp_ajax_ats_delete_model', $ajax_class, 'ajax_handle_delete_model');

        // Get team preview photo
        $this->loader->add_action(
            'wp_ajax_ats_get_team_preview_photo',
            $ajax_class,
            'ajax_handle_get_team_preview_photo'
        );

        // Get team employers photos
        $this->loader->add_action(
            'wp_ajax_ats_get_team_employers_photos',
            $ajax_class,
            'ajax_handle_get_team_employers_photos'
        );

        // Get team templates
        $this->loader->add_action('wp_ajax_ats_get_templates', $ajax_class, 'ajax_handle_get_templates');

        // Get model defaults
        $this->loader->add_action('wp_ajax_'.self::$plugin['prefix'].'_get_settings', $ajax_class, 'ajax_handle_get_settings');
        $this->loader->add_action('wp_ajax_ats_get_team_defaults', $ajax_class, 'ajax_handle_get_team_defaults');
        $this->loader->add_action(
            'wp_ajax_ats_get_employer_defaults',
            $ajax_class,
            'ajax_handle_get_employer_defaults'
        );

        // Get model taxonomy
        $this->loader->add_action('wp_ajax_ats_get_taxonomy_terms', $ajax_class, 'ajax_handle_get_taxonomy_terms');

        // Init MCE on some element
        add_filter('tiny_mce_before_init', 'LooksAwesome\Common\Editor::tiny_mce_before_init', 10, 2);
        add_filter('quicktags_settings', 'LooksAwesome\Common\Editor::quicktags_settings', 10, 2);
        $this->loader->add_action('wp_ajax_ats_get_tiny_mce', $ajax_class, 'ajax_handle_get_tiny_mce');
    }


    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks()
    {

        $plugin_admin = new Admin(self::$plugin['name'], self::$plugin['label'], self::$plugin['version']);

        // unqueue all scripts
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');

        // register custom post type
        $this->loader->add_action('init', $this, 'register_custom_post_types');

        // add action links
        $plugin_basename = plugin_basename(plugin_dir_path(realpath(dirname(__FILE__))).'init.php');
        add_filter('plugin_action_links_'.$plugin_basename, array($this, 'add_action_links'));

        // register vc shortcode
        $this->loader->add_action('vc_before_init', $this, 'register_vc_shortcode');

        //register admin AJAX hooks
        $this->define_ajax_hooks();

    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks()
    {

        $plugin_public = new Frontend(self::$plugin['name'], self::$plugin['version']);
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'register_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'register_scripts');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'register_shortcode');
        add_filter('widget_text', 'do_shortcode');
    }

    /**
     * Register Visual Composer Shortcode
     */

    public function register_vc_shortcode()
    {
        $teams = Team::all();

        $teams_options = array();
        $teams_options['No team choosed'] = 'null';

        if ($teams) {
            foreach ($teams as $team) {
                $teams_options[$team->post_title] = $team->ID;
            }
        }

        $params = array(
            'name' => 'Team Showcase',
            'base' => 'a-team-showcase-vc',
            'description' => __('Add a shiny team made with Team Builder', self::$plugin['name']),
            'category' => 'Content',
            'icon' => self::$plugin['name'],
            'params' => array(
                array(
                    'type' => 'dropdown',
                    'class' => '',
                    'admin_label' => true,
                    'heading' => __('Choose team', self::$plugin['name']),
                    'param_name' => 'ats_team_id',
                    'value' => $teams_options,
                    'std' => 'Choose team',
                ),
            ),
        );
        vc_map($params);
    }


    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     * @return    A_Team_Showcase_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader()
    {
        return $this->loader;
    }

    public function add_action_links($links)
    {

        return array_merge(
            array(
                'settings' => '<a href="'.admin_url(
                        'admin.php?page='.self::$plugin['name']
                    ).'">'.'Settings'.'</a>',
                'docs' => '<a target="_blank" href="http://team.looks-awesome.com/docs/Getting_Started">'.'Documentation'.'</a>',
            ),
            $links
        );
    }

}
