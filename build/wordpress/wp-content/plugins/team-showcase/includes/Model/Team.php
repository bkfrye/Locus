<?php

namespace TeamBuilder\App\Model;

use LooksAwesome\Common\ArrayUtil;
use LooksAwesome\Common\Post;
use TeamBuilder\App\Template;

class Team extends Post {
    public static $model_name = 'team';
    public static $post_type = 'ats-team';

    public static $validation_rules = array(
        'name' => array(
            'rule' => 'required'
        ),
    );

    public static $fill_rules = array(
        'employers',
        'template',

        'styles' => array(
            'slider',
            'slider_autoplay',
            'slider_adaptive',
            'filter',
            'search',

            'button_color',
            'button_hover_color',
            'button_text_color',
            'button_text_hover_color',

            'filter_bold',
            'filter_italic',

            'reveal',
            'panel',
            'panel_color',
            'panel_contacts_visible',
            'panel_social_visible',

            'body_visible',
            'photo_visible',
            'name_visible',
            'divider_visible',
            'position_visible',
            'short_bio_visible',
            'phone_visible',
            'email_visible',
            'skype_visible',
            'link_visible',
            'location_visible',
            'social_visible',
            'skills_visible',

            'base_color',
            'card_base_color',
            'card_border_color',
            'card_divider_color',
            'card_shadow_color',
            'card_even_row_color',

            'name_bold',
            'name_italic',

            'position_bold',
            'position_italic',

            'short_bio_bold',
            'short_bio_italic',

            'contacts_bold',
            'contacts_italic',
        )
    );

    public static $labels = array(
        'name'               => 'Teams',
        'singular_name'      => 'Team',
        'menu_name'          => 'Teams',
        'name_admin_bar'     => 'Team',
        'add_new'            => 'Add Team',
        'add_new_item'       => '+ Add new team',
        'new_item'           => 'New Team',
        'edit_item'          => 'Edit Team',
        'view_item'          => 'View Team',
        'delete_item'        => 'Delete Team',
        'all_items'          => 'My Teams',
        'search_items'       => 'Search Teams',
        'parent_item_colon'  => 'Parent Teams:',
        'not_found'          => 'No teams found.',
        'not_found_in_trash' => 'No teams found in Trash.'
    );

    public static $fields = array(
        'title', 'editor', 'excerpt'
    );

    protected static $defaults = array(
        'name' => '',
        'description' => '',
        'custom_fields' => array(
            'employers' => array(),
            'layout' => 'grid',
            'title' => '',
            'custom_css' => '',
            'order_by' => 'custom',
            'order_direction' => 'desc',
            'styles' => array(
                'grid' => array(),
                'table' => array(),
                'widget' => array()
            )
        )
    );

    public static $layouts = array(
        'grid' => 'aerial',
        'table' => 'anna',
        'widget' => 'richard'
    );

    public function prepare_input($input){
        $custom_fields = $this->getDefault('custom_fields');
        $data = array(
            'ID' => $this->id,
            'post_type' => static::$post_type,
            'post_status' => 'publish',
            'post_title' => $input['name'],
            'post_excerpt' => $input['description'],
            'custom_fields' => $this->assign_custom_fields($custom_fields, $input['custom_fields'])
        );

        return $data;
    }

    public function set_defaults($input, $defaults){
        $result = array();
        foreach($defaults as $key => $value){
            if(gettype($value) == 'array' && ArrayUtil::is_assoc($value) && isset($input[$key])){
                if($key == 'blocks_order'){
                    $result[$key] = $input[$key];
                }else{
                    $result[$key] = $this->set_defaults($input[$key], $value);
                }
            }else{
                $result[$key] = isset($input[$key]) && $input[$key] !== '' ? $input[$key] : $defaults[$key];
            }
        }
        return $result;
    }

    public function assign_custom_fields($custom_fields, $input){
        $data = array();
        foreach($custom_fields as $key => $value){
            if(!isset($input[$key])){
                continue;
            }
            $field = $input[$key];
            if(gettype($value) == 'array' && ArrayUtil::is_assoc($field)){
                if($key == 'blocks_order'){
                    $data[$key] = $input[$key];
                }else {
                    $data[$key] = $this->assign_custom_fields($value, $field);
                }
            }else{
                $data[$key] = $field;
            }
        }
        return $data;
    }

    public function save($input){
        $input = $this->set_defaults($input, static::getDefaults());
        $data = $this->prepare_input($input);

        if($this->id){
            /* Edit Post */
            $this->update_parents(
                $input['custom_fields']['employers'],
                Employer::$model_name . 's',
                static::$model_name . 's',
                $this->id
            );
            $wp_post = wp_update_post($data);
            $this->save_custom_fields($wp_post, $data['custom_fields'], true);
        }else{
            /* Insert New Post */
            $wp_post = wp_insert_post($data);
            $this->save_custom_fields($wp_post, $data['custom_fields']);
            Employer::update_parents(
                $input['custom_fields']['employers'],
                Employer::$model_name . 's',
                static::$model_name . 's',
                $wp_post
            );
        }

        $this->after_save($input);
        return $wp_post;
    }

    /**
     * @return array
     */
    public static function getDefaults(){
        foreach(static::$layouts as $key => $value){
            $template = Template::get_template($key);
            static::$defaults['custom_fields']['styles'][$key] = $template[$value]['styles'];
        }
        return static::$defaults;
    }

    public static function unsetDefault($styles, $root, $defaults){
        if(!isset($styles[$root])){
            return;
        }
        foreach($styles[$root] as $key => $value) {
            if (isset($styles[$root][$key]) && !array_key_exists($key, $defaults)) {
                unset($styles[$root][$key]);
            }
        }
        return $styles;
    }

    public static function setDefault($styles, $root, $defaults){
        foreach($defaults as $key => $value) {
            $def_instance = static::getDefaults();
            if (array_key_exists($key, $def_instance['custom_fields']['styles'][$root]) && !isset($styles[$root][$key])) {
                $styles[$root][$key] = $value;
            }
        }
        return $styles;
    }

    /**
     * Set default value if field doesn't exist
     *
     * @param $post
     * @return bool
     */
    public static function setDefaults($post){
        $defaults = static::getDefaults();
        foreach($defaults['custom_fields'] as $key => $value){
            if(gettype($value) != 'array'){
                $post->$key = $post->$key ?: $value;
            }
        }
        if(isset($post->styles)){
            $styles = $post->styles;
            foreach(static::$layouts as $key => $value){
                $styles = static::unsetDefault($styles, $key, $defaults['custom_fields']['styles'][$key]);
            }
            foreach(static::$layouts as $key => $value){
                $styles = static::setDefault($styles, $key, $defaults['custom_fields']['styles'][$key]);
            }
            $post->styles = $styles;
        }
        return $post;
    }

    /**
     * Cascade update for related employers
     * @param bool $force_delete
     */
    public function delete($force_delete = true){
        if(isset($this->post->employers)){
            foreach($employers = $this->post->employers as $id){
                $employer = Employer::find($id);
                $teams = $employer->teams ?: array();
                if(($key = array_search($this->id, $teams)) !== false){
                    unset($teams[$key]);
                    update_post_meta($employer->ID, 'teams', $teams);
                }
            }
        }
        wp_delete_post($this->id, $force_delete);
    }
}