<?php get_header(); ?>
  <div id="careers-page">
    <section class="careers-hero">
      <h1></h1>
    </section>
    <div class="careers-content">
      <h3><?php the_title(); ?></h3>
      <h2>Why work with us?</h2>

      <video src="#" autoplay poster="">

      </video>
    </div>

    <section class="blockquote">
      <p>quote</p>

      <div class="quote-author-bio">
        <img src="" alt="">
        <p>paul garrafalo</p>
      </div>
    </section>







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
  </div>
<?php get_footer(); ?>
