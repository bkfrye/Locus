<?php get_header(); ?>

<!-- <style>
  .bg-image img.loaded {
    display: none;
  }
</style> -->

<?php $img = get_field( 'hero_background_image' ); ?>
<?php if ( $img ) : ?>
  <section id="top" class="hero bg-image" style="background-image: url('<?php echo $img; ?>')">
<?php else : ?>
  <section id="top" class="hero" style="background-color: #03487E;">
<?php endif; ?>
  <div id="bg-video"></div>
  <div class="hero-wrapper">
    <div class="hero-content">
      <h1><?php the_field('headline'); ?></h1>
      <p><?php the_field('sub-headline'); ?></p>

      <?php if ( get_field('video_link') ) : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php the_field('video_link'); ?>">
            <span style="margin-right: 9px;margin-bottom: -2px;display: block;">
              <svg width="12px" height="14px" viewBox="0 0 12 14">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-673.000000, -525.000000)" fill="#FFFFFF">
                    <polygon id="Triangle" transform="translate(679.000000, 532.000000) rotate(-270.000000) translate(-679.000000, -532.000000) " points="679 526 686 538 672 538"></polygon>
                  </g>
                </g>
              </svg>
            </span>
            <?php echo __('See How It Works'); ?></span>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<section id="featured-news-callout">
  <div class="callout-wrapper">
    <h2>Featured news</h2>
    <?php
      $post_object = get_field('featured_item');
      if( $post_object ):
      	$post = $post_object;
      	setup_postdata( $post );
      	?>
          <div>
          	<h3><?php the_title(); ?></h3>
            <div class="btn">
              <a href="<?php the_field('news_url'); ?>" target="_blank">Learn More</a>
            </div>
          </div>
      <?php wp_reset_postdata(); ?>
    <?php endif; ?>
  </div>
</section>

<section id="cr-phage"  style="background-image: url('<?php the_field('cr-phage_image'); ?>')">
  <div class="cr-phage-wrapper">
    <div class="cr-phage-content">
      <h2><?php the_field('cr-phage_title'); ?></h2>
      <p><?php the_field('cr-phage_content'); ?></p>
      <?php if ( get_field('cr-phage_video_link') ) : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php the_field('cr-phage_video_link'); ?>">
            <span style="margin-right: 9px;margin-bottom: -2px;display: block;">
              <svg width="12px" height="14px" viewBox="0 0 12 14">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-673.000000, -525.000000)" fill="#FFFFFF">
                    <polygon id="Triangle" transform="translate(679.000000, 532.000000) rotate(-270.000000) translate(-679.000000, -532.000000) " points="679 526 686 538 672 538"></polygon>
                  </g>
                </g>
              </svg>
            </span>
            <?php echo __('Play Video'); ?>
          </div>
        </div>
      <?php endif; ?>
      <h4>LEARN MORE ABOUT US</h4>
    </div>
  </div>
</section>

<section id="pipeline" class="our-pipeline">
  <div class="our-pipeline-wrapper">
    <article>
      <div class="our-pipeline-content">
        <h2><?php echo __('Our Pipeline'); ?></h2>
        <?php the_field('pipeline_content'); ?>
      </div>
    </article>
  </div>
</section>

<?php get_template_part('template_parts/pipeline'); ?>


<section id="careers" class="careers" style="background-image: url('<?php echo get_stylesheet_directory_uri() ?>/img/bg-careers.png')">
  <div class="careers-content wrapper">
    <h4>Help us revolutionize medical science</h4>
    <div class="btn white">
      <a href="<?php the_field('careers_link'); ?>">Our Current Openings</a>
    </div>
  </div>
</section>

<section id="partners" class="partners">
  <div class="partners-wrapper">
    <h4>Our Investors & Partners</h4>
    <ul class="partner-list">
      <?php $logos = get_field('logos'); ?>
      <?php if ( $logos ): ?>
        <?php foreach ($logos as $logo) : ?>
          <li >
            <img src="<?php echo $logo['image']['url']?>" alt="<?php echo $logo['image']['alt']?>">
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <div class="btn">
      <a href="/about-us">Partner with us</a>
    </div>
  </div>
</section>


<?php get_footer(); ?>
<script type="text/javascript">
var bgVideo = new BackgroundVideo({
  container: 'bg-video',

  video: [
    {
      file: "wp-content/themes/locus/img/video.mp4"
    }
  ],

  mobileImg: "wp-content/themes/locus/img/home-bg-image.jpg"
});

</script>
