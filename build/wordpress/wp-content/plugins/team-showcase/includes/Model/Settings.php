<?php
namespace TeamBuilder\App\Model;

use LooksAwesome\Common\ArrayUtil;

class Settings
{
    public static $prefix;
    public static $field_name;
    public static $model_name = 'settings';

    public static $validation_rules = array(
        'capabilities' => array(
            'rule' => 'required',
        ),
    );

    private static $defaults = array(
        'capabilities' => 'manage_options',
    );

    public static $fill_rules = array();

    public function __construct()
    {
        self::$prefix = \LA_Team_Builder::$plugin['prefix'];
        self::$field_name = self::$prefix.'_settings';
    }

    public static function init()
    {
        add_option(self::$field_name, self::$defaults);
    }

    /**
     * @return array
     */
    public static function getDefaults()
    {
        return self::$defaults;
    }

    public function setDefaults($input, $defaults)
    {
        $result = array();
        foreach ($defaults as $key => $value) {
            if (gettype($value) == 'array' && ArrayUtil::is_assoc($value) && isset($input[$key])) {
                $result[$key] = $this->setDefaults($input[$key], $value);
            } else {
                $result[$key] = isset($input[$key]) && $input[$key] !== '' ? $input[$key] : $defaults[$key];
            }
        }

        return $result;
    }

    public static function all()
    {
        $defaults = self::$defaults;
        $option = get_option(self::$field_name);
        $result = self::get_all($defaults, $option);

        return $result;
    }

    public function save($input)
    {
        $input = $this->setDefaults($input, self::$defaults);
        update_option(self::$field_name, $input);
    }

    /**
     * @return array
     */
    public static function get_all($defaults, $option)
    {
        $result = array();
        foreach ($defaults as $key => $value) {
            if (gettype($value) == 'array' && ArrayUtil::is_assoc($value)) {
                $result[$key] = isset($option[$key]) ? self::get_all($defaults[$key], $option[$key]) : $value;
            } else {
                $result[$key] = isset($option[$key]) && !empty($option[$key]) ? $option[$key] : $value;
            }
        }

        return $result;
    }

    public static function get($key)
    {
        $options = self::all();
        $result = ArrayUtil::find_value_by_key($key, $options);

        return $result;
    }
}