<?php get_header(); ?>
<?php $about_bg = get_field('about_hero_image'); ?>
<div class="about-us-hero" style="background-image: url('<?php echo $about_bg; ?>')">
  <div class="about-hero-wrapper">
    <h1 class=""><?php the_field('about_main_headline'); ?></h1>
    <h3><?php the_field('about_main_sub-headline'); ?></h3>
    <div class="btn white">
      <a href="#about">Read More</a>
    </div>
  </div>

</div>
<section id="about" class="about-us">
  <div class="about-us-wrapper">
    <article>
      <h2><?php echo __('Our Vision'); ?></h2>
      <h3><?php the_field('about_headline'); ?></h3>
      <?php the_field('about_content'); ?>

    </article>

    <aside>
      <div>
        <?php $video = get_field('about_video'); ?>
        <?php if ( $video ) : ?>
          <div class="inline-video-container">
            <div class="inline-video" data-url="<?php echo $video; ?>">
              <div class="play-youtube">
                <svg viewBox="0 0 41.999 41.999">
                  <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
                  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
                  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
                </svg>
              </div>
            </div>
          </div>
        <?php endif; ?>
      </div>
    </aside>
  </div>

  <section id="careers" class="careers" style="background-image: url('<?php echo get_stylesheet_directory_uri() ?>/img/bg-careers.png')">
    <div class="careers-content wrapper">
      <h4>Help us revolutionize the treatment of disease</h4>
      <div class="btn white">
        <a href="<?php the_field('careers_link'); ?>">Our Current Openings</a>
      </div>
    </div>
  </section>

  <?php get_template_part('template_parts/employees/index'); ?>

  <a id="partnering" name="partnering"></a>
  <div class="partnering about-us-wrapper">
    <article>
      <h2><?php echo __('Partnering With Us'); ?></h2>
      <h3><?php the_field('partnering_title'); ?></h3>
      <p><?php the_field('partnering_content'); ?></p>
    </article>
    <aside>
      <div>
        <?php $video = get_field('partner_video'); ?>
        <?php if ( $video ) : ?>
          <div class="inline-video-container">
            <div class="inline-video" data-url="<?php echo $video; ?>">
              <div class="play-youtube">
                <svg viewBox="0 0 41.999 41.999">
                  <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
                  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
                  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
                </svg>
              </div>
            </div>
          </div>
        <?php endif; ?>
      </div>
    </aside>
  </div>

  <div class="stewardship">
    <div class="wrapper">
      <h2>Locus Stewardship</h2>
      <h3><?php the_field('stewardship_title'); ?></h3>
      <p><?php the_field('stewardship_content'); ?></p>
    </div>
  </div>

  
  <section class="careers" style="background-image: url('<?php echo get_stylesheet_directory_uri() ?>/img/bg-careers.png')">
    <div class="careers-content wrapper">
      <h4>Contact us dolor sit amet, consectetur adipiscing elit.</h4>
      <div class="btn white">
        <a href="#">Contact Us</a>
      </div>
    </div>
  </section>

  <div class="learn-more-about">
    <div class="wrapper">
      <h4>Learn more</h4>
    </div>
    <div class="link-wrapper">
      <?php $about_cards = get_field('about_us_links'); ?>
      <?php if ( $about_cards ): ?>
        <?php foreach ($about_cards as $link) : ?>
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
</section>

<?php get_footer(); ?>
