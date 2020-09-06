<?php
$args = array(
  'post_type'   => 'board_of_directors',
  'post_status' => 'publish',
 );

$items = new WP_Query( $args );
if( $items->have_posts() ) :
?>
  <ul>
    <?php
      while( $items->have_posts() ) :
        $items->the_post();
        ?>
          <li><?php printf( '%1$s - %2$s', the_title() );  ?></li>
        <?php
      endwhile;
      wp_reset_postdata();
    ?>
  </ul>
<?php
else :
  esc_html_e( 'No board members have been added!', 'locus' );
endif;
?>