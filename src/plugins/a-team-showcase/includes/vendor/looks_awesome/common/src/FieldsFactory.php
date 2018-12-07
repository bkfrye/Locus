<?php

namespace LooksAwesome\Common;

/**
 * Class FieldsFactory
 * @package Awesome
 */
class FieldsFactory{
    protected $model;
    protected $placeholder = '';
    // TODO refactor class names
    protected static $wrapper_classes = array(
        'colorpicker' => 'bootstrap-colorpicker',
        'font_style' => 'btn-group btn-group-checkbox',
        'align' => 'btn-group btn-group-align btn-group-radio',
        'text_transform' => 'btn-group btn-group-text-transform btn-group-radio',
        'shape' => 'btn-group btn-group-photo-shape btn-group-radio'
    );
    protected static $wrapper_data_field_names = array(
        'align',
        'text_transform',
        'font_style',
        'shape'
    );

    /**
     * FieldsFactory constructor.
     * @param string $model Model name
     * @param string $placeholder JS template placholder
     */
    public function __construct($model, $placeholder = ''){
        $this->model = $model;
        $this->placeholder = $placeholder;
    }

    /**
     * Get arg if exist
     * @param $array
     * @param $key
     * @return string
     */
    protected function get_arg($array, $key){
        return isset($array[$key]) ? $array[$key] : '';
    }

    /**
     * Colorpicker field
     * @param $name
     * @param $args
     * @return string
     */
    protected function colorpicker($name, $args){
        $html = '<span class="input-group-addon color"><i></i></span>';
        $html .= '<input type="hidden"
               name="' . $name . '"
               class="option-color"
               value=""
               class="form-control" />';
        return $html;
    }

    /**
     * Input text field
     * @param $name
     * @param $args
     * @return string
     */
    protected function text_field($name, $args){
        return '<input type="text" name="' . $name . '" class="form-control" placeholder="' . $this->get_arg($args, 'placeholder') . '">';
    }

    /**
     * Select
     * @param $name
     * @param $args
     * @return string
     */
    protected function select($name, $args){
        $options = $this->get_arg($args, 'options');
        $html = '<select name="' . $name . '" data-field="' . $this->get_arg($args, 'name') . '">';
        if(is_array($options)){
            foreach($options as $key => $value){
                $html .= '<option value="'. $key . '">' . $value . '</option>';
            }
        }
        $html .= '</select>';
        return $html;
    }

    /**
     * Group with radio inputs
     * @param $input_name
     * @param $args
     * @return string
     */
    protected function radio_group($input_name, $args){
        $html = '';
        $items = $args['items'];
        $name = $args['name'];
        foreach($items as $key => $value){
            $html .= '<label type="button" class="btn btn-default active ' . $this->placeholder . '_' . $name . '_' . $key . '" data-option-name="' . $name . '">
                        <input type="radio"
                               style="display: none;"
                               name="' . $input_name . '"
                               class="option-align"
                               checked
                               data-value="' . $key .'" />' . $value . '</label>';
        }
        return $html;
    }

    /**
     * Font style (bold/italic) checkbox group field
     * @param $name
     * @param $args
     * @return string
     */
    protected function font_style($name, $args){
        $html = '';
        $styles = array(
            'bold' => 'B',
            'italic' => 'I'
        );
        foreach($styles as $key => $value){
            $html .= '<label type="button" class="btn btn-default ' . $this->placeholder . '_' . $key . ' btn-' . $key . ' model-field" data-option-name="' . $key . '">
                        <input type="hidden"
                               style="display: none;"
                               class="option-' . $key . '"
                               name="' . $this->model .  '_' . $this->placeholder . '_' . $key . '"
                               value=""
                               checked
                               data-value=""
                               data-checked="" />';
            $html .= $key == 'bold' ? "<strong>$value</strong>" : "<em>$value</em>";
            $html .= '</label>';
        }
        return $html;
    }

    /**
     * Text align field
     * @param $name
     * @param $args
     * @return string
     */
    protected function align($name, $args){
        $args['items'] = array(
            'left' => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-align-left"></use></svg>',
            'center'  => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-align-center"></use></svg>',
            'right'  => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-align-right"></use></svg>'
        );
        $html = $this->radio_group($name, $args);
        return $html;
    }

    /**
     * Text transform (none/uppercase) field
     * @param $name
     * @param $args
     * @return string
     */
    protected function text_transform($name, $args){
        $args['items'] = array(
            'none' => 'Aa',
            'uppercase' => 'AA'
        );
        $html = $this->radio_group($name, $args);
        return $html;
    }

    /**
     * Image shape (square/rounded square/round) field
     * @param $name
     * @param $args
     * @return string
     */
    protected function shape($name, $args){
        $args['items'] = array(
            'square' => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-image-square"></use></svg>',
            'squarerounded' => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-image-squarerounded"></use></svg>',
            'round' => '<svg viewBox="0 0 36 36"><use xlink:href="#icon-image-round"></use></svg>'
        );
        $html = $this->radio_group($name, $args);
        return $html;
    }

    /**
     * Get field wrapper DIV
     * @param $field
     * @param $field_name
     * @param $args
     * @return string
     */
    protected function get_wrapper($field, $field_name, $args){
        $name = $this->get_arg($args, 'name');
        $type = $this->get_arg($args, 'type');
        $label = $this->get_arg($args, 'label');
        $group = $this->get_arg($args, 'group');
        $hideable = !$group ? 'model-field' : '';
        $class = $this->get_arg($args, 'wrapper_class') . $this->get_arg(static::$wrapper_classes, $type);
        $data_filed = in_array($type, static::$wrapper_data_field_names) ? "data-field-name='$this->placeholder'" : '';
        $html = "<div class='$field_name $hideable $name $class ' $data_filed>";
        if($label){
            $html .= '<span class="field_label">' . $label . '</span>';
        }
        $html .= $field;
        $html .= '</div>';
        return $html;
    }

    /**
     * Get field
     * @param $args
     * @return string|void
     */
    public function get($args){
        $type = $this->get_arg($args, 'type');
        $field_name = $this->placeholder ? $this->placeholder . '_' . $this->get_arg($args, 'name') : '_' . $this->get_arg($args, 'name');
        $name = $this->model . '_' . $field_name;
        if(!method_exists($this, $type)){
            return;
        }
        $field = $this->$type($name, $args);
        $html = $this->get_wrapper($field, $field_name, $args);
        return $html;
    }
}