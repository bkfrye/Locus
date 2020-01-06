<?php get_header(); ?>
<?php $about_bg = get_field('about_hero_image'); ?>
<div class="about-us-hero" style="background-image: url('<?php echo $about_bg; ?>')">
  <div class="about-hero-wrapper">
    <h1><?php the_field('about_main_headline'); ?></h1>
    <h3><?php the_field('about_main_sub-headline'); ?></h3>
    <div class="btn white">
      <a href="#">Read More</a>
    </div>
  </div>

</div>
<section class="about-us">

  <div class="about-us-wrapper">
    <article class="fade-in load-hidden">
      <h2><?php echo __('About Us'); ?></h2>
      <h3><?php the_field('about_headline'); ?></h3>
      <?php the_field('about_content'); ?>

    </article>

    <aside>
      <div class="fade-in load-hidden">
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

  <div class="learn-more">
    <div class="learn-more-wrapper">
      <div class="card">
        <h3>crPhage</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ultrices tempus. Curabitur id laoreet sapien.</p>
        <a href="#">More</a>
      </div>
    </div>
  </div>

  <section id="our-team" class="our-team">
    <div class="our-team-wrapper fade-in">
      <article>
        <h2><?php echo __('Our Team'); ?></h2>
        <h3><?php the_field('team_headline'); ?></h3>
      </article>

      <div id="team-wrapper">
        <?php echo do_shortcode('[a-team-showcase id="5564"]') ?>
      </div>
    </div>
  </section>

  <div class="work-for-us">
    <div class="wrapper">
      <h3>Want to work with us?</h3>
      <div class="btn">
        <a href="#careers">view our openings</a>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
