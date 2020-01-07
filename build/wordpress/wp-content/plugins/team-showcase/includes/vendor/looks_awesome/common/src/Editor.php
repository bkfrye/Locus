<?php

namespace LooksAwesome\Common;

class Editor {
    private static $mce_settings = null;
    private static $qt_settings = null;

    /*
    * AJAX Call Used to Generate the WP Editor
    */
    public static function editor_html() {
        $data = $_POST['data'];
        $content = isset($data['content']) ? stripslashes( $data['content'] ) : '';
        wp_editor($content, $data['id'], array(
            'textarea_name' => $data['id'],
            'textarea_rows' => 10,
            'quicktags' => true,
            'media_buttons' => true,
            'wpautop' => false
        ) );
        $mce_init = self::get_mce_init($data['id']);
        $qt_init = self::get_qt_init($data['id']); ?>
        <script type="text/javascript">
            tinyMCEPreInit.mceInit = jQuery.extend( tinyMCEPreInit.mceInit, <?php echo $mce_init ?>);
            tinyMCEPreInit.qtInit = jQuery.extend( tinyMCEPreInit.qtInit, <?php echo $qt_init ?>);
        </script>
        <?php
        //die();
    }

    /**
    * Used to retrieve the javascript settings that the editor generates
    */

    public static function quicktags_settings( $qtInit, $editor_id ) {
        self::$qt_settings = $qtInit;
        return $qtInit;
    }

    public static function tiny_mce_before_init( $mceInit, $editor_id ) {
        self::$mce_settings = $mceInit;
        return $mceInit;
    }

    /**
     * Code coppied from _WP_Editors class (modified a little)
     *
     * @param $editor_id
     * @return string
     */
    private static function get_qt_init($editor_id) {
        if ( !empty(self::$qt_settings) ) {
            $options = self::_parse_init( self::$qt_settings );
            $qtInit = "'$editor_id':{$options},";
            $qtInit = '{' . trim($qtInit, ',') . '}';
        } else {
            $qtInit = '{}';
        }
        return $qtInit;
    }

    /**
     * @param $editor_id
     * @return string
     */
    private static function get_mce_init($editor_id) {
        if ( !empty(self::$mce_settings) ) {
            $options = self::_parse_init( self::$mce_settings );
            $mceInit = "'$editor_id':{$options},";
            $mceInit = '{' . trim($mceInit, ',') . '}';
        } else {
            $mceInit = '{}';
        }
        return $mceInit;
    }

    /**
     * @param $init
     * @return string
     */
    private static function _parse_init($init) {
        $options = '';

        foreach ( $init as $k => $v ) {
            if ( is_bool($v) ) {
                $val = $v ? 'true' : 'false';
                $options .= $k . ':' . $val . ',';
                continue;
            } elseif ( !empty($v) && is_string($v) && ( ('{' == $v{0} && '}' == $v{strlen($v) - 1}) || ('[' == $v{0} && ']' == $v{strlen($v) - 1}) || preg_match('/^\(?function ?\(/', $v) ) ) {
                $options .= $k . ':' . $v . ',';
                continue;
            }
            $options .= $k . ':"' . $v . '",';
        }

        return '{' . trim( $options, ' ,' ) . '}';
    }

}