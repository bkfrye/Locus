<?php get_header(); ?>
<?php if ( get_field( 'hero_background_image' ) ) : ?>
  <section id="top" class="hero" style="background-image: url('<?php the_field( 'hero_background_image' ); ?>')">
<?php else : ?>
  <section id="top" class="hero" style="background-color: #03487E;">
<?php endif; ?>
  <div class="hero-wrapper">
    <div class="hero-content fade-in load-hidden">
      <h1><?php the_field('headline'); ?></h1>
      <p><?php the_field('sub-headline'); ?></p>

      <?php if ( get_field('video_link') ) : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php the_field('video_link'); ?>"><span><?php echo __('See How It Works'); ?></span></div>
        </div>
      <?php endif; ?>
    </div>
    <div class="down-arrow">
      <a href="#about-us">
        <svg viewBox="0 0 451.847 451.847">
        	<path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" fill="#FFFFFF"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<section id="about-us" class="about-us">
  <div class="about-us-wrapper">
    <article class="fade-in load-hidden">
      <h2><?php echo __('About Us'); ?></h2>
      <?php the_field('about_content'); ?>
      <div class="text-link">
        <a href="<?php the_field('about_link'); ?>"><?php echo __('Read More on Our Technology'); ?></a>
      </div>
    </article>

    <aside>
      <div class="fade-in load-hidden">
        <h3><?php the_field('about_side_column_title'); ?></h3>
        <?php the_field('about_side_column_content'); ?>

        <?php if ( get_field('include_video') == 1 ) : ?>
          <div class="btn play">
            <div class="btn-content" data-url="<?php the_field('video_button'); ?>"><span><?php echo __('Watch Video'); ?></span></div>
          </div>
        <?php endif; ?>
      </div>
    </aside>
  </div>
</section>

<?php get_template_part('template_parts/overview'); ?>

<section class="parallax-bg"></section>

<section id="our-pipeline" class="our-pipeline">
  <div class="our-pipeline-wrapper">
    <article class="fade-in load-hidden">
      <div class="our-pipeline-content">
        <h2><?php echo __('Our Pipeline'); ?></h2>
        <?php the_field('pipeline_content'); ?>
      </div>
    </article>

    <aside>
      <?php $infos = get_field('aside_content'); ?>
      <?php if ( $infos ) : ?>
        <?php foreach ( $infos as $info ) : ?>
          <div class="aside-item fade-in load-hidden">
            <div class="aside-image">
              <img src="<?php echo $info['icon_image']; ?>" alt="icon">
            </div>
            <div class="aside-content">
              <h3><?php echo $info['title']; ?></h3>
              <p><?php echo $info['content']; ?></p>

              <?php if ( get_field('video_link') ) : ?>
                <div class="btn white play">
                  <div class="btn-content" data-url="<?php echo get_field('video_link'); ?>">
                    <span><?php echo __('Watch Video'); ?></span>
                  </div>
                </div>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </aside>
  </div>
</section>

<?php $graphs = get_field('graphs'); ?>
<?php if ( $graphs ) : ?>
  <section id="graphs" class="graphs">
    <div class="graph-wrapper">
      <?php foreach ( $graphs as $graph ) : ?>
        <div class="graph-item fade-in load-hidden" >
          <h3><?php echo $graph['title']; ?></h3>
          <img src="<?php echo $graph['image']['url']; ?>" alt="<?php echo $graph['image']['alt']; ?>">
        </div>
      <?php endforeach; ?>
    </div>
  </section>
<?php endif; ?>
<section class="parallax-bg" style="background-image: url('<?php the_field('parallax_image_2'); ?>')"></section>

<section id="our-team" class="our-team">
  <div class="our-team-wrapper fade-in">
    <article>
      <h2><?php echo __('Our Team'); ?></h2>
      <h3><?php the_field('team_content'); ?></h3>
    </article>

    <div id="team-wrapper">
      <?php echo do_shortcode('[a-team-showcase id="5564"]') ?>
    </div>
  </div>
</section>

<section id="careers" class="careers" style="background-image: url('<?php echo get_stylesheet_directory_uri() ?>/img/bg-careers.png')">
  <div class="careers-content fade-in">
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
          <li class="fade-in load-hidden">
            <img src="<?php echo $logo['image']['url']?>" alt="<?php echo $logo['image']['alt']?>">
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
    <div class="btn fade-in load-hidden">
      <a href="#contact">Partner with us</a>
    </div>
  </div>
</section>


<?php get_footer(); ?>
