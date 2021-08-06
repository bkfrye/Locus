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

<?php
  $sticky = get_option( 'sticky_posts' );
  $args = array(
          'posts_per_page' => 1,
          'post__in' => $sticky,
          'ignore_sticky_posts' => 1
  );
  $query = new WP_Query( $args );

  if ( isset( $sticky[0] ) ) :
?>
  <section id="featured-news-callout">
    <div class="callout-wrapper">
      <h2>Featured news</h2>
      <?php
          echo '<div>';
          if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
            echo '<h3>' . get_the_title() . '</h3>';
            echo '<div class="btn"><a href="' . get_the_permalink() . '">Learn More</a></div>';
          endwhile; endif;
          echo '</div>';
      ?>
    </div>
  </section>
<?php 
  endif;
  wp_reset_postdata();
?>

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
      <h4><a href="<?php echo site_url(); ?>/technology">LEARN MORE ABOUT US</a></h4>
    </div>
  </div>
  <div class="wrapper">
    <div class="card">
      <h3>Technology</h3>
      <p>See how we’re advancing beyond bacterial subtraction and using phage to add back key components</p>

      <div class="inline-link">
        <a href="<?php echo site_url(); ?>/technology">More
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
          </span>
        </a>
      </div>
    </div>
    <div class="card">
      <h3>Manufacturing crPhage</h3>
      <p>Learn how in-house manufacturing allows us to make a CRISPR-based precision medicine for the massess</p>

      <div class="inline-link">
        <a href="<?php echo site_url(); ?>/manufacturing">More
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
          </span>
        </a>
      </div>
    </div>
    <div class="card">
      <h3>About Us</h3>
      <p>Find out what makes us tick and what it’s like working and partnering with us</p>

      <div class="inline-link">
        <a href="<?php echo site_url(); ?>/about-us">More
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
          </span>
        </a>
      </div>
    </div>
  </div>
</section>

<section id="features">
  <div class="features-wrapper">
    <!-- TODO -->
  </div>
</section>

<section id="partners" class="partners">
  <div class="partners-wrapper">
    <h4>Our Investors & Partners</h4>
    <ul class="partner-list top">
      <?php $logosTop = get_field('logos_top'); ?>
      <?php if ( $logosTop ): ?>
        <?php foreach ($logosTop as $logoTop) : ?>
          <li>
            <a href="<?php echo $logoTop['link']; ?>" target="_blank">
              <img src="<?php echo $logoTop['image']['url']?>" alt="<?php echo $logoTop['image']['alt']?>"/>
            </a>
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <ul class="partner-list middle">
      <?php $logosMiddle = get_field('logos_middle');?>

      <?php if ( $logosMiddle ): ?>
        <?php foreach ($logosMiddle as $logoMiddle) : ?>
          <li>
            <a href="<?php echo $logoMiddle['link']; ?>" target="_blank">
              <img src="<?php echo $logoMiddle['image']['url']?>" alt="<?php echo $logoMiddle['image']['alt']?>"/>
            </a>
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <ul class="partner-list bottom">
      <?php $logosBottom = get_field('logos_bottom'); ?>
      <?php if ( $logosBottom ): ?>
        <?php foreach ($logosBottom as $logoBottom) : ?>
            <li>
              <a href="<?php echo $logoBottom['link']; ?>" target="_blank">
                <img src="<?php echo $logoBottom['image']['url']?>" alt="<?php echo $logoBottom['image']['alt']?>"/>
              </a>
            </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <!-- <div class="btn">
      <a href="/about-us">Partner with us</a>
    </div> -->
  </div>
</section>


<div class="learn-more">
  <div class="wrapper">
    <h4>Learn more</h4>
  </div>
  <div class="wrapper">
    <div class="card">
      <h3>Pipeline</h3>
      <p>Discover our robust asset pipeline that hits both infectious and inflammatory diseases</p>

      <div class="inline-link">
        <a href="<?php echo site_url(); ?>/technology">More
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
          </span>
        </a>
      </div>
    </div>
    <div class="card">
      <h3>Partnering</h3>
      <p>Find out our approach to partnering and how we innovate on a timeline</p>

      <div class="inline-link">
        <a href="<?php echo site_url(); ?>/manufacturing">More
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<?php get_footer(); ?>
<script type="text/javascript">
var bgVideo = new BackgroundVideo({
  container: 'bg-video',
  video: [{ file: "wp-content/themes/locus/img/video.mp4" }],
  mobileImg: "wp-content/themes/locus/img/home-bg-image.jpg"
});

</script>
