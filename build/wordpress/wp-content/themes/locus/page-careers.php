<?php get_header(); ?>
  <section id="careers-page">
    <div class="careers-content">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
      	<?php the_content(); ?>
      <?php endwhile; endif; ?>
    </div>

    <div class="careers-listing">
      <?php $jobs = get_field('jobs'); ?>
      <?php if ( $jobs ) : ?>
        <ul class="accordion">
          <?php foreach ( $jobs as $job ) : ?>
            <li class="job-item">
              <div class="clickable">
                <?php echo $job['job_title']; ?>
              </div>
              <div class="accordion-content">
                <?php echo $job['description']; ?>
              </div>
            </li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    </div>
  </section>
<?php get_footer(); ?>
