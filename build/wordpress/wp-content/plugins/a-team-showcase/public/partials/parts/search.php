<?php

if ($preview) {
    return;
}
$slider = 0;
if(isset($styles['slider'])){
    $slider = $styles['slider'];
}

if ($styles['search'] == '1') {
    echo '<div class="ats-search">';
        echo '<span class="icon-search"></span>';
        echo '<input type="text" placeholder="'.__(
                'Search...',
                LA_Team_Builder::$plugin['name']
            ).'" data-action="employers-search">';
        echo '<span class="icon-close" data-action="clear-search" title="Clear"></span>';
    echo '</div>';
    ?>
    <script type="text/javascript">
        (function ($) {
            $(function () {
                ATS.init_search(<?php echo $this->data->ID; ?>, <?php echo $slider; ?>);
            });
        }(jQuery));
    </script>
    <?php
}