<?php get_header(); ?>
<?php $careers_bg = get_field('careers_bg_image'); ?>
<div class="careers-hero" style="background-image: url('<?php echo $careers_bg; ?>')">
  <div class="careers-hero-wrapper">
    <h1><?php the_field('careers_headline'); ?></h1>
    <p><?php the_field('careers_content'); ?></p>
    <div class="btn white play">
      <div class="btn-content" data-url="<?php the_field('work_video_url'); ?>">
        <span style="margin-right: 9px;margin-bottom: -2px;display: block;">
          <svg width="12px" height="14px" viewBox="0 0 12 14">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-673.000000, -525.000000)" fill="#03487E">
                      <polygon id="Triangle" transform="translate(679.000000, 532.000000) rotate(-270.000000) translate(-679.000000, -532.000000) " points="679 526 686 538 672 538"></polygon>
                  </g>
              </g>
          </svg>
        </span>
        <?php echo __('Hear from the team'); ?>
      </div>
    </div>
  </div>
</div>


  <div class="careers-page-content">
    <section id="listing" class="careers-listing">
      <h2>Current Openings</h2>
      <?php
        $args = array(
          'post_type' => 'careers',
          'post_status' => 'publish',
          'posts_per_page' => -1,
          'order' => 'ASC',
          'cat' => 'home',
        );
        $loop = new WP_Query( $args );
      ?>
      <ul class="accordion">
      <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
        <li class="job-item">
          <a href="<?php the_permalink(); ?>" class="job-item-link" target="_blank">
            <div class="click-block">
              <div class="list-item-content">
                <h3><?php the_title(); ?></h3>
                <div class="job-info">
                  <p>Type: <span><?php the_field('type'); ?></span></p>
                  <p>Location: <span><?php the_field('location'); ?></span></p>
                </div>
              </div>
              <div class="list-item-link">
                <div class="inline-link">
                  <p>Read More</p>
                </div>
              </div>
            </div>
          </a>
        </li>
      <?php endwhile; wp_reset_postdata(); ?>
    </ul>
    </section>
  </div>
<?php get_footer(); ?>
