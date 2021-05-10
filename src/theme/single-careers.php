<?php get_header(); ?>
  <div class="careers-page-content">
    <section id="listing" class="careers-listing">
  		<div class="list-item-content">
        <h3><?php the_title(); ?></h3>
        <div class="job-info" style="padding-bottom: 4em;">
          <p>Type: <?php the_field('type'); ?></p>
          <p>Location: <?php the_field('location'); ?></p>
        </div>
  		</div>
      <?php the_field('description'); ?>

      <div class="application-form">
        <?php gravity_form(1, false, false, false, '', true, 12); ?>
      </div>
    </section>
  </div>
<?php get_footer(); ?>
