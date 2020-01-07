<?php get_header(); ?>
<div id="technology">
  <?php if ( get_field('background_image') ) : ?>
    <section id="top" class="hero" style="background-image: url('<?php the_field('background_image'); ?>')">
  <?php else : ?>
    <section id="top" class="hero" style="background-color: gray;">
  <?php endif; ?>
    <div class="hero-wrapper">
      <div class="hero-content fade-in load-hidden">
        <h1>crPhage<sup>TM</sup> Technology</h1>
        <p><?php the_field('tech_sub_headline'); ?></p>
        <?php if ( get_field('tech_video_link') ) : ?>
          <div class="btn white play">
            <div class="btn-content" data-url="<?php the_field('tech_video_link'); ?>"><span><?php echo __('Play Video'); ?></span></div>
          </div>
        <?php endif; ?>

        <?php //global $wp; $currentURL = home_url( $wp->request ); ?>
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


      <div class="item fade-in load-hidden">
        <div class="header-image" style="background-image: url('<?php echo get_field('manufacturing_header_image')['url']; ?>')">
        </div>
        <p class="title medium-blue"><?php the_field('manufacturing_title'); ?></p>
        <?php $links = get_field('manufacturing_articles'); ?>
        <?php if ( $links ) : ?>
          <?php foreach( $links as $link ) : ?>
            <a href="#<?php echo convertToAnchor($link['title']) ?>">
              <?php echo $link['title']; ?>
            </a>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>



    </div>
  </section>

  <?php get_template_part('template_parts/dap'); ?>

  <?php get_template_part('template_parts/sbm'); ?>

  <?php get_template_part('template_parts/am'); ?>

  <div class="end-section">
    <div class="btn">
      <a href="#top">Back to Top</a>
    </div>
  </div>
</div>

<?php get_footer(); ?>
