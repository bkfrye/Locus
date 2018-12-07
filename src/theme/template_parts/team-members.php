<?php $query = new WP_Query(
  array(
    'post_type' => 'teammembers',
  )

); ?>

<div class="team-members">
  <div class="team-members-categories">
    <?php
      $taxonomy = 'team_categories';
      $terms = get_terms($taxonomy); // Get all terms of a taxonomy
      if ( $terms && !is_wp_error( $terms ) ) :
    ?>
      <ul>
        <?php foreach ( $terms as $term ) : ?>
          <li><?php echo $term->name; ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif;?>
  </div>

  <ul class="member-profiles">
    <li class="member">
      <div class="member-img" style="background-image:url('')">
        <div class="more-link">
          <p>More</p>
        </div>
      </div>
      <?php if ( $query->have_posts() ) : ?>
        <?php while ( $query->have_posts() ) : $query->the_post(); ?>
          <div>
            <p class="member-name"><?php the_title(); ?></p>
            <p class="member-title"><?php the_field('job_title') ?></p>
          </div>
        <?php endwhile; wp_reset_postdata(); ?>
      <?php endif; ?>
    </li>
  </ul>
</div>