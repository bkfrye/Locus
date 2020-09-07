<?php
namespace TeamBuilder\App\Model;

use LooksAwesome\Common\Post;

class Employer extends Post {
    public static $model_name = 'employer';
    public static $post_type = 'ats-employer';

    public static $validation_rules = array(
        'name' => array(
            'rule' => 'required'
        )
    );

    public static $fill_rules = array(
        'foto'
    );

    public static $labels = array(
        'name'               => 'Employees',
        'singular_name'      => 'Employee',
        'menu_name'          => 'Employees',
        'name_admin_bar'     => 'Employee',
        'add_new'            => 'Add Employee',
        'add_new_item'       => '+ Add new member',
        'new_item'           => 'New Employee',
        'edit_item'          => 'Edit Employee',
        'view_item'          => 'View Employee',
        'delete_item'        => 'Fire Employee',
        'all_items'          => 'All Employees',
        'search_items'       => 'Search Employees',
        'parent_item_colon'  => 'Parent Employees:',
        'not_found'          => 'No employees found.',
        'not_found_in_trash' => 'No employees found in Trash.',
        'add_to_team'        => 'Add employee to team'
    );

    public static $fields = array(
        'title', 'editor', 'thumbnail', 'excerpt'
    );

    protected static $defaults = array(
        'name' => '',
        'department' => '',
        'short_bio' => '',
        'custom_fields' => array(
            'position' => '',
            'thumbnail_id' => 0,
            'email' => '',
            'phone' => '',
            'skype' => '',
            'link' => '',
            'link_text' => '',
            'location' => '',
            'profile' => '',
            'facebook' => '',
            'twitter' => '',
            'linkedin' => '',
            'google' => '',
            'instagram' => '',
            'pinterest' => '',
            'youtube' => '',
            'vimeo' => '',
            'dribble' => '',
            'flickr' => '',
            'github' => '',
            'skills' => array(),
            'skills_order' => array(),
            'panel_text' => ''
        )
    );

    public function after_save($input){
        $thumbnail_id = $input['custom_fields']['thumbnail_id'];
        if(!empty($thumbnail_id)){
            set_post_thumbnail($this->id, $thumbnail_id);
        }else{
            delete_post_thumbnail($this->id);
        }
        wp_set_post_terms($this->id,  $input['department'], static::$taxonomy);
    }

    public function prepare_input($input){
        $custom_fields = $this->getDefault('custom_fields');
        $data = array(
            'ID' => $this->id,
            'post_type' => static::$post_type,
            'post_status' => 'publish',
            'post_title' => $input['name'],
            'post_excerpt' => $input['short_bio'],
            'custom_fields' => $this->assign_custom_fields($custom_fields, $input['custom_fields'])
        );

        return $data;
    }

    public function delete($force_delete = true){
        if(isset($this->post->teams)){
            foreach($teams = $this->post->teams as $id){
                $team = Team::find($id);
                $employers = $team->employers;
                if(($key = array_search($this->id, $employers)) !== false){
                    unset($employers[$key]);
                    update_post_meta($team->ID, 'employers', $employers);
                }
            }
        }
        wp_delete_post($this->id, $force_delete);
    }

    public static function get_photo($id, $preview){
        if(isset($id) && has_post_thumbnail($id)){
            $foto_id = get_post_thumbnail_id($id);
            $foto = wp_get_attachment_image_src($foto_id, 'large', false);
            $photo = $foto[0];
        }else{
            $base = plugin_dir_url(realpath(__DIR__ . '/..'));
            $photo = $base . 'public/img/default-avatar.jpg';
            if($preview) {
                $photo = $base . 'public/img/john-doe.jpg';
            }
        }
        return $photo;
    }
} 