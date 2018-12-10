<?php get_header(); ?>

<section id="top" class="hero" style="background-image: url('<?php the_field('hero_background_image'); ?>')">
  <div class="hero-wrapper">
    <div class="hero-content">
      <h1><?php the_field('headline'); ?></h1>
      <p><?php the_field('sub-headline'); ?></p>

      <?php if ( get_field('video_link') ) : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php the_field('video_link'); ?>"><span>See How It Works</span></div>
        </div>
      <?php else : ?>
        <div class="btn white play">
          <div class="btn-content" data-url="<?php echo get_stylesheet_directory_uri(); ?>/img/phage.mp4"><span>See How It Works</span></div>
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
    <article>
      <h2><?php echo __('About Us'); ?></h2>
      <?php the_field('about_content'); ?>

      <div class="text-link">
        <a href="<?php echo get_site_url(); ?>/technology">Read More on Our Technology</a>
      </div>
    </article>

    <aside>
      <h3><?php the_field('about_side_column_title'); ?></h3>
      <?php the_field('about_side_column_content'); ?>

      <?php if ( get_field('include_video') == 1 ) : ?>
        <div class="btn play">
          <div class="btn-content" data-url="<?php the_field('video_button'); ?>"><span>Watch Video</span></div>
        </div>
      <?php endif; ?>
    </aside>
  </div>
</section>

<section id="overview" class="overview">

  <?php $item = get_field('overview_items'); ?>


  <div class="overview-item" style="background-image: url('<?php // ?>)">
    <div class="overview-item-content">
      <p class="item-title">Our Platform</p>
      <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
      <div class="text-link white">
        <a href="<?php $item['link']; ?>">More</a>
      </div>
    </div>
  </div>

</section>

<section class="parallax-bg"></section>

<section id="our-pipeline" class="our-pipeline">
  <div class="our-pipeline-wrapper">
    <article>
      <div class="our-pipeline-content">
        <h2>Our Pipeline</h2>
        <h3>Locus Biosciences’ crPhage platform has the potential to revolutionize medical science in two critical areas. </h3>
        <?php // the_field('our_pipline_content'); ?>
        <p>The first is infectious diseases.

        <p>Our lead program targeting Escherichia coli will enter clinical development in the first half of 2019 with a Phase 1b clinical trial in patients colonized with E. coli in their urinary tracts. </p>

        <p>We also have crPhage development programs targeting Clostridium difficile, Pseudomonas aeruginosa, Staphylococcus aureus, and other ESKAPE pathogens.</p>

        <p>The second area is microbiome-related disease. Our additional crPhage programs are aimed at undisclosed bacterial targets relevant for inflammatory bowel disease (IBD) and other disorders causes by dysbiosis of the microbiome in gastrointestinal, immunology, oncology, and central nervous system therapy areas.</p>
      </div>
    </article>

    <aside>
      <div class="aside-item">
        <div class="aside-image">
          <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/infectious-diseases.png" alt="">
        </div>
        <div class="aside-content">
          <h3>Infectious Diseases</h3>
          <p>Learn how our crPhage products kill pathogenic bacteria, including antibiotic-resistant “superbugs.”</p>


          <div class="btn white play">
            <div class="btn-content" data-url="<?php echo get_stylesheet_directory_uri(); ?>/img/phage.mp4">
              <span>Watch Video</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</section>

<section id="graphs" class="graphs">
  <div class="graph-wrapper">
    <div class="graph-item">
      <h3>Infectious Disease</h3>
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/infectious-disease.png" alt="">
    </div>
    <div class="graph-item">
      <h3>Microbiome</h3>
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/microbiome.png" alt="">
    </div>
  </div>
</section>

<section class="parallax-bg" style=""></section>

<section id="our-team" class="our-team">
  <div class="our-team-wrapper">
    <article>
      <h2>Our Team</h2>
      <h3>Locus Biosciences has assembled an experienced team of leaders in CRISPR, antibacterial drug development, and biotech finance to drive our products into clinical development.</h3>
    </article>

    <div id="team-wrapper">
      <?php echo do_shortcode('[a-team-showcase id="5564"]') ?>
    </div>
  </div>
</section>

<section id="careers" class="careers" style="background-image: url('<?php echo get_stylesheet_directory_uri() ?>/img/bg-careers.png')">
  <div class="careers-content">
    <h4>Help us revolutionize medical science</h4>
    <div class="btn white">
      <a href="#">Our Current Openings</a>
    </div>
  </div>
</section>

<section id="partners" class="partners">
  <div class="partners-wrapper">
    <h4>Our Investors & Partners</h4>
    <ul class="partner-list">
      <li>
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/logo-abstract-ventures.png" alt="">
      </li>
    </ul>
    <div class="btn">
      <a href="#">Partner with us</a>
    </div>
  </div>
</section>


<?php get_footer(); ?>
