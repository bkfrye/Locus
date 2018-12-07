<?php
namespace TeamBuilder\App;

use TeamBuilder\App\Model\Employer;
use TeamBuilder\App\Model\Settings;
use TeamBuilder\App\Model\Team;
use TeamBuilder\App\Template;
use TeamBuilder\App\Shortcode;
use LooksAwesome\Common\Validator;
use LooksAwesome\Common\Response;
use LooksAwesome\Common\Editor;

class Ajax {
    protected $response;
    protected static $namespace;

    public function __construct(){
        $this->response = new \WP_Ajax_Response;
        self::$namespace = \LA_Team_Builder::$plugin['namespace'];
    }

    /**
     * Get Model data by ID
     */
    public function ajax_handle_get_employer(){
        $input = $_REQUEST['data'];
        $post = Employer::find($input['id']);

        $thumb_id = get_post_thumbnail_id($post->ID);
        $thumb_url = wp_get_attachment_image_src($thumb_id, 'a-thumbnail');

        $terms = wp_get_post_terms($post->ID, Employer::getTaxonomy(), array('fields' => 'names'));

        $result = array(
            'model' => 'employer',
            'id' => $post->ID,
            'name' => $post->post_title,
            'department' => $terms,
            'short_bio' => $post->post_excerpt,
            'foto' => $thumb_url[0] ?: '', // $thumb_url returns array (url, width, height, (bool) resized)
            'fill_rules' => Employer::$fill_rules,
            'custom_fields' => array(
                'thumbnail_id' => $thumb_id, // $thumb id
            )
        );

        // mass assignment for custom fields
        $custom_fields = get_post_custom($post->ID);
        foreach($custom_fields as $key => $value){
            $result['custom_fields'][$key] = $post->$key;
        }

        $response = Response::get($this->response, json_encode($result), 'get_model');
        $response->send();

        wp_die();
    }

    protected function make_employer($post){
        // mass assignment for custom fields
        $custom_fields = $post->ID == 0 ? $post->custom_fields : get_post_custom($post->ID);
        foreach($custom_fields as $key => $value){
            $result[$key] = isset($post->$key) ? $post->$key : $post->custom_fields[$key];
        }

        $result['model'] = 'employer';
        $result['id'] = $post->ID;
        $result['name'] = $post->post_title;
        $result['short_bio'] = $post->post_excerpt;
        $result['fill_rules'] = Employer::$fill_rules;

        return $result;
    }

    protected function make_team($post){
        // get team employers list
        $employers = $post->employers;
        $shortcode = new Shortcode();
        $post = Team::setDefaults($post);

        if(gettype($employers) == 'array' && count($employers) > 0){
            $employers = Employer::where(
                array(
                    'post_type' => Employer::$post_type,
                    'post__in' => $employers,
                    'orderby' => 'post__in',
                    'posts_per_page' => -1
                )
            );
            foreach($employers as $employer){
                $employer->post_id = $employer->ID;
                $foto = wp_get_attachment_image_src(
                    get_post_thumbnail_id($employer->ID),
                    'a-thumbnail'
                );
                $employer->foto = $foto[0];
                $employer->position = get_post_meta($employer->ID, 'position', true);
                $teams = get_post_meta($employer->ID, 'teams', true);
                $employer->teams_count = count($teams);
            }
        }

        // mass assignment for custom fields
        $custom_fields = $post->ID == 0 ? $post->custom_fields : get_post_custom($post->ID);
        foreach($custom_fields as $key => $value){
            $result[$key] = isset($post->$key) ? $post->$key : $post->custom_fields[$key];
        }

        $result['model'] = 'team';
        $result['id'] = $post->ID;
        $result['name'] = $post->post_title;
        $result['description'] = $post->post_excerpt;
        $result['employers'] = $employers;
        $result['fill_rules'] = Team::$fill_rules;

        // backward compatibility for old default structure
        $result['template'] = isset($post->template) ? $post->template : $post->styles[$post->layout]['template'];
        if(isset($custom_fields['template'])){
            $result['template'] = array_key_exists('template', $custom_fields) ? $custom_fields['template'] : $post->styles[$post->layout]['template'];
        }

        foreach(Team::$layouts as $key => $value){
            $result[$key . '_html'] = $shortcode->preview($post, $key);
        }

        return $result;
    }

    /**
     * Get Model data by ID
     */
    public function ajax_handle_get_team(){
        $input = $_REQUEST['data'];
        $post = Team::find($input['id']);

        $result = $this->make_team($post);

        $response = Response::get($this->response, json_encode($result), 'get_model');
        $response->send();

        wp_die();
    }

    /**
     * Get Testimonial defaults
     */
    public function ajax_handle_get_settings(){
        $settings = new Settings();
        $result = $settings::all();
        $result['fill_rules'] = Settings::$fill_rules;
        $result['model'] = 'settings';

        $response = Response::get($this->response, json_encode($result), 'get_settings');
        $response->send();

        wp_die();
    }

    /**
     * Get Employer defaults
     */
    public function ajax_handle_get_employer_defaults(){
        $defaults = Employer::getDefaults();

        $post = new \stdClass;
        $post->ID = 0;
        $post->post_name = '';
        $post->post_type = 'employer';
        $post->post_excerpt = '';
        $post->custom_fields = $defaults['custom_fields'];

        $post = new \WP_Post($post);
        $result = $this->make_employer($post);

        $response = Response::get($this->response, json_encode($result), 'get_employer_defaults');
        $response->send();

        wp_die();
    }

    /**
     * Get Team defaults
     */
    public function ajax_handle_get_team_defaults(){
        $defaults = Team::getDefaults();

        $post = new \stdClass;
        $post->ID = 0;
        $post->post_name = '';
        $post->post_type = 'team';
        $post->post_excerpt = '';
        $post->employers = array();
        $post->custom_fields = $defaults['custom_fields'];

        $post = new \WP_Post($post);
        $result = $this->make_team($post);

        $response = new \WP_Ajax_Response();
        $response = Response::get($this->response, json_encode($result), 'get_team_defaults');
        $response->send();

        wp_die();
    }

    protected function avoid_empty_field($input, $key){
        return isset($input[$key]) ? $input[$key] : '';
    }

    public function ajax_handle_update_settings(){
        if(!empty($_POST['data'])){
            $input = $_REQUEST['data']['data'];
        }

        foreach(Settings::getDefaults() as $key => $value){
            $input[$key] = $this->avoid_empty_field($input, $key);
        }

        $validator = new Validator(Settings::$model_name, self::$namespace);
        $validation = $validator->validate($input);

        if(count($validation->errors) > 0){
            $response = Response::get($this->response, $validation, 'errors');
            $response->send();
            wp_die();
        }

        $settings = new Settings();
        $settings->save($input);

        $response = Response::get($this->response, '1', 'update_settings');
        $response->send();
        wp_die();
    }

    /**
     * Route for add Employer Ajax request
     *
     * @return xml WP_Response
     */
    public function ajax_handle_update_or_new_employer(){
        if(!empty($_POST['data'])){
            $input = $_REQUEST['data']['data'];
        }
        $cf = isset($input['custom_fields']) ? $input['custom_fields'] : '';

        $input['id'] = $this->avoid_empty_field($input, 'id');
        $input['name'] = $this->avoid_empty_field($input, 'name');
        $input['department'] = $this->avoid_empty_field($input, 'department');
        $input['short_bio'] = $this->avoid_empty_field($input, 'short_bio');
        $input['custom_fields'] = array(
            'position' => $this->avoid_empty_field($cf, 'position'),
            'thumbnail_id' => $this->avoid_empty_field($cf, 'thumbnail_id'),
            'email' => $this->avoid_empty_field($cf, 'email'),
            'phone' => $this->avoid_empty_field($cf, 'phone'),
            'skype' => $this->avoid_empty_field($cf, 'skype'),
            'link' => $this->avoid_empty_field($cf, 'link'),
            'link_text' => $this->avoid_empty_field($cf, 'link_text'),
            'location' => $this->avoid_empty_field($cf, 'location'),
            'profile' => $this->avoid_empty_field($cf, 'profile'),
            'facebook' => $this->avoid_empty_field($cf, 'facebook'),
            'twitter' => $this->avoid_empty_field($cf, 'twitter'),
            'linkedin' => $this->avoid_empty_field($cf, 'linkedin'),
            'google' => $this->avoid_empty_field($cf, 'google'),
            'instagram' => $this->avoid_empty_field($cf, 'instagram'),
            'pinterest' => $this->avoid_empty_field($cf, 'pinterest'),
            'youtube' => $this->avoid_empty_field($cf, 'youtube'),
            'vimeo' => $this->avoid_empty_field($cf, 'vimeo'),
            'dribble' => $this->avoid_empty_field($cf, 'dribble'),
            'flickr' => $this->avoid_empty_field($cf, 'flickr'),
            'github' => $this->avoid_empty_field($cf, 'github'),
            'skills' => $this->avoid_empty_field($cf, 'skills'),
            'skills_order' => $this->avoid_empty_field($cf, 'skills_order'),
            'panel_text' => $this->avoid_empty_field($cf, 'panel_text'),
        );

        $validator = new Validator(Employer::$model_name, self::$namespace);
        $validation = $validator->validate($input);

        if(count($validation->errors) > 0){
            $response = Response::get($this->response, $validation, 'errors');
            $response->send();
            wp_die();
        }
        $id = !empty($input['id']) ? (int) $input['id'] : null;

        $employer = new Employer(
            array(
                'id' => $id
            )
        );

        $id = $employer->save($input);

        $response = Response::get($this->response, $id, 'update_or_new_employer');
        $response->send();
        wp_die();
    }

    /**
     * Route for add Team Ajax request
     *
     * @return xml WP_Response
     */
    public function ajax_handle_update_or_new_team(){
        if(!empty($_POST['data'])){
            $prepare = $_REQUEST['data']['data'];
        }
        $input['id'] = isset($prepare['id']) ? $prepare['id'] : '';
        $input['name'] = isset($prepare['name']) ? $prepare['name'] : '';
        $input['description'] = isset($prepare['description']) ? $prepare['description'] : '';
        $input['custom_fields'] = array(
            'employers' => isset($prepare['employers_ids']) ? array_map('intval', $prepare['employers_ids']) : array(),
            'layout' => isset($prepare['layout']) ? $prepare['layout'] : '',
            'title' => isset($prepare['title']) ? $prepare['title'] : '',
            'custom_css' => isset($prepare['custom_css']) ? $prepare['custom_css'] : '',
            'order_by' => isset($prepare['order_by']) ? $prepare['order_by'] : '',
            'order_direction' => isset($prepare['order_direction']) ? $prepare['order_direction'] : '',
            'styles' => isset($prepare['styles']) ? $prepare['styles'] : array()
        );

        $validator = new Validator(Team::$model_name, self::$namespace);
        $validation = $validator->validate($input);

        if(count($validation->errors) > 0){
            $response = Response::get($this->response, $validation, 'errors');
            $response->send();
            wp_die();
        }
        $id = !empty($input['id']) ? (int) $input['id'] : null;

        $team = new Team(
            array(
                'id' => $id
            )
        );
        $id = $team->save($input);

        $response = Response::get($this->response, $id, 'update_or_new_team');
        $response->send();
        wp_die();
    }

    /**
     * Universal AJAX delete route
     */
    public function ajax_handle_delete_model(){
        $input = $_REQUEST['data'];
        $id = (int) $input['id'];
        $model_name = $input['model_name'];

        if(isset($id) && isset($model_name)){
            $model_name = self::$namespace . '\App\Model\\' .  ucfirst($model_name);
            $post = new $model_name(array('id' => $id));
            $post->delete();
            $response = Response::get($this->response, $id, 'delete_model');
        }else{
            $errors = new WP_Error();
            $errors->add('delete-error', 'Id or model not defined');
            $response = Response::get($this->response, $errors, 'errors');
        }
        $response->send();
        exit();
    }

    public function ajax_handle_get_team_preview_photo(){
        $input = $_REQUEST['data'];
        $id = (int) $input['id'];
        $size = $input['size'];

        $photo = get_the_post_thumbnail(
            $id,
            $size
        );

        $response = Response::get($this->response, json_encode($photo), 'team_preview_photo');
        $response->send();
        wp_die();
    }

    public function ajax_handle_get_team_employers_photos(){
        $input = $_REQUEST['data'];
        $ids = $input['ids'];
        $size = $input['size'];
        $result = array();

        $default_avatar_path = plugins_url('admin/img/default-avatar.png', dirname(__FILE__));
        $default_avatar = '<img src="' . $default_avatar_path . '" class="attachment-thumbnail" alt="" ?>';

        foreach($ids as $id){
            $photo = get_the_post_thumbnail(
                $id,
                $size
            );
            $result[] = $photo ?: $default_avatar;
        }
        $response = Response::get($this->response, json_encode($result), 'team_employers_photos');
        $response->send();
        wp_die();
    }

    public function ajax_handle_get_templates(){
        $templates = Template::get_templates();

        $response = Response::get($this->response, json_encode($templates), 'get_templates');
        $response->send();
        wp_die();
    }

    public function ajax_handle_get_taxonomy_terms(){
        $input = $_REQUEST['data'];
        $tax = $input['taxonomy'];
        $query = isset($input['query']) ? $input['query'] : '';
        $result = array();

        if($tax){
            $result = get_terms($tax, array(
                'hide_empty' => false,
                'name__like' => esc_attr($query)
            ));
        }

        $response = Response::get($this->response, json_encode($result), 'get_taxonomy_terms');
        $response->send();
        wp_die();

    }

    public function ajax_handle_get_tiny_mce(){
        ob_start();
        Editor::editor_html();
        $html = ob_get_contents();
        ob_end_clean();

        $response = Response::get($this->response, json_encode($html), 'init_tinymce');
        $response->send();
        wp_die();
    }
}