<?php
$args = array(
  'post_type'   => 'management',
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
          <li class="employee-item" data-id="<?php echo the_id();?>" data-type="management">
            <?php the_title();  ?>
          </li>
        <?php
      endwhile;
      wp_reset_postdata();
    ?>
  </ul>
<?php
else :
  esc_html_e( 'No managers have been added!', 'locus' );
endif;
?>