<?php get_header(); ?>
<div id="secondary-page">
  <?php if ( get_field('background_image') ) : ?>
    <section id="top" class="hero" style="background-image: url('<?php the_field('background_image'); ?>')">
  <?php else : ?>
    <section id="top" class="hero" style="background-color: gray;">
  <?php endif; ?>
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1>Precision Therapeutics Platform</h1>
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
        <h2>crPhage & ePhage Platforms</h2>
        <h3><?php the_field('platform_headline'); ?></h3>
      </article>
    </div>
    <?php 
      $image = get_field('technology_image');
      if ($image) :
    ?>
      <img <?php responsive_image( $image['id'],'device','1440px'); ?> class="desktop-img" alt="<?php echo $image['title']; ?>">
    <?php endif; ?>
    <?php 
      $mobile_image = get_field('technology_image_mobile');
      if ($mobile_image) :
    ?>
      <img <?php responsive_image( $mobile_image['id'],'device','1440px'); ?> class="mobile-img" alt="<?php echo $mobile_image['title']; ?>">
    <?php endif; ?>
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

      <div class="item">
        <div class="header-image" style="background-image: url('<?php echo get_field('atlas_header_image')['url']; ?>')">
        </div>
        <p class="title lighter-blue"><?php the_field('atlas_title'); ?></p>
        <?php $links = get_field('atlas_articles'); ?>
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

  <?php get_template_part('template_parts/atlas'); ?>

  <section class="cas3-cas9">
    <a name="gene-editing"></a>
    <div class="cas3-cas9-wrapper">
      <h2>CRISPR-Cas3 Gene Editing Platform</h2>
      <h3><?php the_field('platform_title'); ?></h3>
      <p><?php the_field('platform_content'); ?></p>
      <?php if ( get_field('platform_video_link') ) : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php the_field('platform_video_link'); ?>">
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
    </div>
  </section>

  <div class="learn-more-technology">
    <div class="wrapper">
      <h4>Learn more</h4>
    </div>
    <div class="link-wrapper">
      <?php $tech_cards = get_field('technology_cards'); ?>
      <?php if ( $tech_cards ): ?>
        <?php foreach ($tech_cards as $link) : ?>
          <div class="card">
            <h3><?php echo $link['title']; ?></h3>
            <p><?php echo $link['content']; ?></p>

            <div class="inline-link">
              <a href="<?php echo site_url() . $link['link']; ?>">More
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
                </span>
              </a>
            </div>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>

  <div class="end-section">
    <div class="btn">
      <a href="#top">Back to Top</a>
    </div>
  </div>
</div>

<?php get_footer(); ?>
