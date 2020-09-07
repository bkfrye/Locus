<?php
$args = array(
  'post_type'   => 'team',
  'post_status' => 'publish',
  'posts_per_page' => -1
 );

$items = new WP_Query( $args );
if( $items->have_posts() ) :
?>
<ul class="employee-list">
  <?php
    while( $items->have_posts() ) :
      $items->the_post();
      ?>
        <li class="employee-list-item" data-id="<?php echo the_id();?>" data-type="team">
          <div class="image">
            <?php
              $image = get_field('profile_image');
              $size = 'thumbnail'; // (thumbnail, medium, large, full or custom size)
              if( $image ) {
                echo wp_get_attachment_image( $image, $size );
              } else { ?>
                <img src="<?php echo get_template_directory_uri(); ?>/img/profile-placeholder.png" height="150px" width="150px" alt="profile image placeholder">
              <?php }
            ?>
          </div>
          <?php the_title('<p class="name">','</p>');  ?>
          <p class="role">
            <?php the_field('role');?>
          </p>
        </li>
      <?php
    endwhile;
    wp_reset_postdata();
  ?>
</ul>
<?php
else :
  esc_html_e( 'No team members have been added!', 'locus' );
endif;
?>