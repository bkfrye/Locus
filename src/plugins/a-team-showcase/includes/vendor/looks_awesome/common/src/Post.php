<?php

namespace LooksAwesome\Common;

class Post {
    /**
     * Clear singular name for model
     *
     * @var string
     */
    public static $model_name = '';

    /**
     * Custom post type
    */
    public static $post_type = 'any';

    /**
     * @var
     */
    public $id;

    protected $post;

    protected static $taxonomy;


    /**
     * Validation rules for model Testimonial
     * Each field on front-end MUST contains model name, for example 'testimonial-name' is field for Testimonial' name
     * Fields in rules are clean, w/o model name
     *
     * @var array
     */
    public static $validation_rules = array();

    /**
     * Text labels for register post type
     *
     * @var array
     */
    public static $labels = array();


    /**
     * Text labels for post' custom taxonomy
     *
     * @var array
     */
    public static $tax_labels = array();

    /**
     * Post capabilities
     *
     * @var array
     */
    public static $capabilities = array(
        'edit_post'          => 'update_core',
        'read_post'          => 'update_core',
        'delete_post'        => 'update_core',
        'delete_posts'       => 'update_core',
        'edit_posts'         => 'update_core',
        'edit_others_posts'  => 'update_core',
        'publish_posts'      => 'update_core',
        'read_private_posts' => 'update_core',
    );

    /**
     * Editable fields for post
     *
     * @var array
     */
    public static $fields = array();

    /**
     * Default values for model fields
     *
     * @var array
     */
    private static $defaults = array();

    public function __construct($args = array()){
        if(isset($args['id'])){
            $this->id = $args['id'];
            $post = static::find($this->id);
            $this->post = $post;
            return $post;
        }
        if(isset($args['post'])){
            $this->post = $args['post'];
            $this->id = $this->post->ID;
            return $this;
        }
    }


    /**
     * @param $name
     * @return mixed
     */
    public function __get($name){
        if(isset(static::$name)){
            return static::$name; // if static property exist -> return
        }else{
            return $this->post->$name; // else return custom field
        }
    }

    public function __isset($name){
        return isset($this->$name);
    }

    /**
     * Get model default values (fields & custom fields)
     *
     * @return array
     */
    public static function getDefaults()
    {
        return static::$defaults;
    }

    /**
     * Get defult value for one field
     *
     * @return array
     */
    public static function getDefault($label)
    {
        $defaults = static::getDefaults();
        return $defaults[$label];
    }

    /**
     * Register custom post type for model
     */
    public static function register_post_type(){
        $args = array(
            'labels' => static::$labels,
            // visible in admin menu?
            'public' => false,
            'capabilities' => static::$capabilities,
            'supports' => static::$fields,
            'rewrite' => false
        );
        register_post_type(
            static::$post_type,
            $args
        );
    }

    /**
     * Register taxonomy for custom post type
     *
     * Default name is $custom_post_type_name . '_taxonomy'
     */
    public static function register_taxonomy(){
        $args = array(
            'label' => static::$model_name . ' taxonomy',
            'labels' => static::$tax_labels,
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true
        );
        register_taxonomy(static::$post_type . '-taxonomy', static::$post_type, $args);
        static::$taxonomy = static::$post_type . '-taxonomy';
    }

    /**
     * Wrap for WP_Query
     *
     * @param array $args
     * @return \WP_Query
     * @throws \Exception
     */
    public static function query($args = array()){
        $query = new \WP_Query($args);
        wp_reset_postdata();
        return $query;
    }

    /**
     * Get all model's entries
     *
     * @return \WP_Query
     */
    public static function all(){
        $args = array(
            'post_type' => static::$post_type,
            'posts_per_page' => -1
        );
        $query = static::query($args);
        if($query->have_posts()){
            return $query->get_posts();
        }
    }

    /**
     * Find model by ID
     *
     * @param $id
     * @return \WP_Post
     */
    public static function find($id){
        if($id != null){
            $args = array(
                'p' => $id,
                'post_type' => static::$post_type
            );
            $query = static::query($args);
            if($query->have_posts()){
                return $query->post;
            }
        }else{
            $error = new \WP_Error();
            $error->add('0', 'ID is not defined');
            return $error;
        }

    }

    /**
     * Select model by custom query
     *
     * @param array $args
     * @return array
     */
    public static function where($args = array()){
        $query = static::query($args);
        if($query->have_posts()){
            return $query->posts;
        }
        return array();
    }

    /**
     * Delete model custom fields
     */
    public function delete_meta(){
        global $wpdb;
        $wpdb->query(
            $wpdb->prepare(
                "
                DELETE FROM $wpdb->postmeta
                WHERE post_id = %d
                ",
                $this->id
            )
        );
    }

    /**
     * Set default values for model before save
     *
     * @param $input
     * @param $defaults
     * @return array
     */
    public function set_defaults($input, $defaults){
        $result = array();
        foreach($defaults as $key => $value){
            if(gettype($value) == 'array' && ArrayUtil::is_assoc($value) && isset($input[$key])){
                $result[$key] = $this->set_defaults($input[$key], $value);
            }else{
                $result[$key] = isset($input[$key]) && $input[$key] !== '' ? $input[$key] : $defaults[$key];
            }
        }
        return $result;
    }

    /**
     * Prepare input data from request before save
     *
     * @param $input
     * @return array
     */
    public function prepare_input($input){
        $data = array(
            'ID' => $this->id,
            'post_type' => static::$post_type,
            'post_status' => array_key_exists('post_status', $input) ? $input['post_status'] : 'publish',
            'post_title' => $input[static::$model_name . '_name'],
        );
        return $data;
    }

    /**
     * Before save callback
     *
     * @param $input
     */
    public function before_save($input){

    }

    /**
     * After save callback
     *
     * @param $input
     */
    public function after_save($input){

    }

    /**
     * Recursively assign model' custom fields from input
     *
     * @param $custom_fields
     * @param $input
     * @return array
     */
    public function assign_custom_fields($custom_fields, $input){
        $data = array();
        foreach($custom_fields as $key => $value){
            if(!isset($input[$key])){
                continue;
            }
            $field = $input[$key];
            if(gettype($value) == 'array' && ArrayUtil::is_assoc($field)){
                $data[$key] = $this->assign_custom_fields($value, $field);
            }else{
                $data[$key] = $field;
            }
        }
        return $data;
    }

    /**
     * Save custom fields on model create/update
     *
     * @param $id
     * @param $custom_fields
     * @param bool|false $update
     */
    public function save_custom_fields($id, $custom_fields, $update = false){
        foreach($custom_fields as $key => $value){
            if($update){
                update_post_meta($id, $key, $value);
            }else{
                add_post_meta($id, $key, $value);
            }
        }
    }

    /**
     * Save model
     *
     * @param $input
     * @return int|WP_Error
     */
    public function save($input){
        $input = $this->set_defaults($input, static::getDefaults());
        $data = $this->prepare_input($input);

        $this->before_save($input);

        if(isset($this->id)){
            /* Edit Post */
            $wp_post = wp_update_post($data);
            $this->save_custom_fields($wp_post, $data['custom_fields'], true);
        }else{
            /* Insert New Post */
            $wp_post = wp_insert_post($data);
            $this->save_custom_fields($wp_post, $data['custom_fields']);
        }

        $this->id = $wp_post;

        $this->after_save($input);
        return $wp_post;
    }

    /**
     * Delete model by id
     *
     * @param bool $force_delete
     */
    public function delete($force_delete = true){
        wp_delete_post($this->id, $force_delete);
    }

    /**
     * Publish model by id
     *
     */
    public function publish(){
        wp_publish_post($this->id);
    }

    // Link & unlink one model to another

    public function link($childs, $parent_model, $parent_id){
        foreach($childs as $child){
            $child_parents = get_post_meta($child, $parent_model, true);
            if($child_parents == null){
                update_post_meta($child, $parent_model, array($parent_id));
                continue;
            }
            if(!in_array($parent_id, $child_parents)){
                array_push($child_parents, $parent_id);
                update_post_meta($child, $parent_model, $child_parents);
            }
        }
    }

    public function unlink($child_model, $parent_model, $parent_id){
        $childs = get_post_meta($parent_id, $child_model, true);
        if(empty($childs)){
            return;
        }
        foreach ($childs as $child) {
            $child_parents = get_post_meta($child, $parent_model, true) ?: array();
            if(($key = array_search($parent_id, $child_parents)) !== false){
                unset($child_parents[$key]);
            }
            update_post_meta($child, $parent_model, $child_parents);
        }
    }

    public function update_parents($childs, $child_model, $parent_model, $parent_id){
        $this->unlink($child_model, $parent_model, $parent_id);
        $this->link($childs, $parent_model, $parent_id);

    }

    // Getters & Setters

    /**
     * Get all model labels
     *
     * @return array
     */
    public static function getLabels()
    {
        return static::$labels;
    }

    /**
     * Get label by key
     *
     * @param $key
     * @return array
     */
    public static function getLabel($key)
    {
        return __(static::$labels[$key]);
    }


    /**
     * @return mixed
     */
    public static function getPostType()
    {
        return static::$post_type;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public static function getTaxonomy()
    {
        return self::$taxonomy;
    }

    /**
     * Return "Empty model" message
     *
     * @param $count
     * @param $model
     * @param $hint
     */
    public static function display_empty_model_message($count, $model, $hint){
        $hidden = $count > 0 ? 'visibility:hidden;opacity:0;display:none;' : '';
        $html = '<div class="empty-model" style="' . $hidden . '">';
        $html .= '<h5>';
        $html .= 'No ' . $model . ' found.';
        $html .= '</h5>';
        $html .= '<p class="hint">';
        $html .= $hint;
        $html .= '</p>';
        $html .= '</div>';
        echo $html;
    }

    /**
     * @return mixed
     */
    public function getPost()
    {
        return $this->post;
    }

}