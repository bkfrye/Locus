<?php
$args = array(
  'post_type'   => 'management',
  'post_status' => 'publish',
 );

$items = new WP_Query( $args );
if( $items->have_posts() ) :
?>
  <ul class="employee-list management">
    <?php
      while( $items->have_posts() ) :
        $items->the_post();
        ?>
          <li class="employee-list-item" data-id="<?php echo the_id();?>" data-type="management">
            <div class="image-wrapper">
              <div class="image">
                <div class="overlay">
                  <p>
                    More
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 32 32"><path fill="#fff" d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"/><path fill="none" d="M0 0h32v32H0z"/></svg>
                    </span>
                  </p>
                </div>
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
  esc_html_e( 'No managers have been added!', 'locus' );
endif;
?>