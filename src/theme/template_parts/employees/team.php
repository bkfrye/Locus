<?php
$args = array(
  'post_type'   => 'team',
  'post_status' => 'publish',
  'posts_per_page' => -1
 );

$items = new WP_Query( $args );
if( $items->have_posts() ) :
?>
<div class="prev-arrow arrow-btn">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"/><path fill="none" d="M0 0h32v32H0z"/></svg>
</div>
<div class="next-arrow arrow-btn">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"/><path fill="none" d="M0 0h32v32H0z"/></svg>
</div>
<ul class="employee-list team-carousel">
  <?php
    while( $items->have_posts() ) :
      $items->the_post();
      ?>
        <li class="employee-list-item no-detail" data-id="<?php echo the_id();?>" data-type="team">
          <div class="image-wrapper">
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