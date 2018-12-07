<?php
namespace LooksAwesome\Common;

class ArrayUtil{
    /**
     * Check if array is associative
     *
     * @param array $array
     * @return bool
     */
    public static function is_assoc(array $array){
        $result = count(array_filter(array_keys($array), 'is_string'));
        return (bool) $result;
    }

    /**
     * Find element  key in multidimensional array by value
     * @param $needle
     * @param $haystack
     * @return int|null|string
     */
    public static function find_key_by_value($needle, $haystack){
        $result = null;
        foreach ($haystack as $key => $value) {
            if(is_array($value)){
                $result = self::find_key_by_value($needle, $value);
            }
            if ($value === $needle) {
                $result =  $key;
            }
        }
        return $result;
    }

    /**
     * Find element index in multidimensional array by value
     * @param $needle
     * @param $haystack
     * @return int|null|string
     */
    public static function find_index_by_value($needle, $haystack){
        $keys = self::get_keys($haystack);
        $key = self::find_key_by_value($needle, $haystack);
        $result = self::find_key_by_value($key, $keys);
        return $result;
    }

    public static function find_value_by_key($needle, $haystack){
        if(array_key_exists($needle, $haystack)){
            return $haystack[$needle];
        }
        foreach($haystack as $key => $value){
            if(is_array($value)){
                $result = self::find_value_by_key($needle, $value);
                if($result){
                    return $result;
                }
            }
        }
        return false;
    }

    /**
     * Get multidimensional array keys
     * @param $array
     * @return bool
     */
    public static function get_keys($array){
        $result = false;
        $i = 0;
        foreach($array as $key => $value){
            if(is_array($value)){
                $result[$i] = self::get_keys($value);
            }else{
                $result[$i] = $key;
            }
            $i++;
        }
        return $result;
    }
}