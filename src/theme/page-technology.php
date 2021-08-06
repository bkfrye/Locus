<?php get_header(); ?>
<div id="secondary-page">
  <?php if ( get_field('background_image') ) : ?>
    <section id="top" class="hero" style="background-image: url('<?php the_field('background_image'); ?>')">
  <?php else : ?>
    <section id="top" class="hero" style="background-color: gray;">
  <?php endif; ?>
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1>Precision Technology</h1>
        <p><?php the_field('tech_sub_headline'); ?></p>
        <?php if ( get_field('tech_video_link') ) : ?>
          <div class="btn white play">
            <div class="btn-content" data-url="<?php the_field('tech_video_link'); ?>">
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

        <?php //global $wp; $currentURL = home_url( $wp->request ); ?>
      </div>
    </div>
  </section>

  <section id="platform" class="our-platform">
    <div class="wrapper">
      <article>
        <h2>Our Platform</h2>
        <h3><?php the_field('platform_headline'); ?></h3>
      </article>
    </div>
  </section>

  <section class="featured-items">
    <div class="featured-items-wrapper">

      <div class="item">
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

      <div class="item">
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
