<?php get_header(); ?>
<div id="technology">
  <?php if ( get_field('background_image') ) : ?>
    <section id="top" class="hero" style="background-image: url('<?php the_field('background_image'); ?>')">
  <?php else : ?>
    <section id="top" class="hero" style="background-color: gray;">
  <?php endif; ?>
    <div class="hero-wrapper">
      <div class="hero-content fade-in load-hidden">
        <h1><?php the_title(); ?></h1>
        <p><?php the_field('sub-headline'); ?></p>

        <?php global $wp; $currentURL = home_url( $wp->request ); ?>
        <div class="hero-btn-wrapper">
          <?php if ( get_field('button_1') ) : ?>
            <div class="btn white">
              <a href="#bacteriophage">
                <?php the_field('button_1'); ?>
              </a>
            </div>
          <?php endif; ?>
          <?php if ( get_field('button_2') ) : ?>
            <div class="btn white">
              <a href="#cas-3">
                <?php the_field('button_2'); ?>
              </a>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <section id="platform" class="our-platform">
    <div class="wrapper">
      <article class="fade-in load-hidden">
        <h2>Our Platform</h2>
        <h3><?php the_field('platform_headline'); ?></h3>
      </article>
    </div>
  </section>

  <section class="featured-items">
    <div class="featured-items-wrapper">
      <div class="item fade-in load-hidden">
        <div class="header-image" style="background-image: url('<?php echo get_field('dap_header_image')['url']; ?>')">
        </div>
        <p class="title"><?php the_field('discovery_title'); ?></p>
        <?php $links = get_field('dap_articles'); ?>
        <?php if ( $links ) : ?>
          <?php foreach( $links as $link ) : ?>
            <a href="#<?php echo convertToAnchor($link['title']) ?>">
              <?php echo $link['title']; ?>
            </a>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
      <div class="item fade-in load-hidden">
        <div class="header-image" style="background-image: url('<?php echo get_field('methods_header_image')['url']; ?>')">
        </div>
        <p class="title light-blue"><?php the_field('methods_title'); ?></p>
        <?php $links = get_field('sbm_articles'); ?>
        <?php if ( $links ) : ?>
          <?php foreach( $links as $link ) : ?>
            <a href="#<?php echo convertToAnchor($link['title']) ?>">
              <?php echo $link['title']; ?>
            </a>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </div>
    <div class="development-time">
      <?php get_template_part('img/stopwatch.svg'); ?>
      <h4>
        <?php the_field('development_time'); ?>
      </h4>
    </div>
  </section>

  <?php get_template_part('template_parts/dap'); ?>

  <?php get_template_part('template_parts/sbm'); ?>

  <div class="end-section">
    <div class="btn">
      <a href="#top">Back to Top</a>
    </div>
  </div>
</div>

<?php get_footer(); ?>
