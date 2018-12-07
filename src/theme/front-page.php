<?php get_header(); ?>

<section class="hero">
  <div class="hero-wrapper">
    <div class="hero-content">
      <h1>Introducing crPhage</h1>
      <p>CRISPR-engineered precision antibacterial products
  to revolutionize the treatment of disease</p>
      <div class="btn white play">
        <a href="#"><span>See How It Works</span></a>
      </div>
    </div>
    <div class="down-arrow">
      <svg viewBox="0 0 451.847 451.847">
      	<path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" fill="#FFFFFF"/>
      </svg>
    </div>
  </div>
</section>

<section class="about-us">
  <div class="about-us-wrapper">
    <article>
      <h2>About Us</h2>
      <h3>Locus Biosciences’ CRISPR-Phage (“crPhage”) platform combines the proven safety of bacteriophage with the antibacterial power of CRISPR-Cas3 to create the most innovative antibacterial therapies in decades.</h3>
      <?php // the_field('about_us_content'); ?>
      <p>crPhage is designed to rapidly respond to emerging antibiotic resistant pathogenic threats at the site of infection.</p>

      <p>By selectively removing unwanted bacteria, while leaving the many species of good bacteria intact, crPhage can address the growing list of diseases related to the human microbiome.</p>

      <div class="text-link">
        <a href="#">Read More on Our Technology</a>
      </div>
    </article>

    <aside>
      <h3>What we do</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>

      <div class="btn play">
        <a href="#"><span>Watch Video</span></a>
      </div>
    </aside>
  </div>
</section>

<section class="overview">
  <div class="overview-item" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/img/bg-platform.png')">
    <div class="overview-item-content">
      <p class="item-title">Our Platform</p>
      <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
      <div class="text-link white">
        <a href="#">More</a>
      </div>
    </div>
  </div>
  <div class="overview-item" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/img/bg-cas3.png')">
    <div class="overview-item-content">
      <p class="item-title">Our Platform</p>
      <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
      <div class="text-link white">
        <a href="#">More</a>
      </div>
    </div>
  </div>
  <div class="overview-item" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/img/bg-bacteriophage.png')">
    <div class="overview-item-content">
      <p class="item-title">Our Platform</p>
      <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
      <div class="text-link white">
        <a href="#">More</a>
      </div>
    </div>
  </div>
</section>

<section class="parallax-bg"></section>

<section class="our-pipeline">
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
            <a href="#"><span>Watch Video</span></a>
          </div>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="graphs">
  <div class="graph-wrapper">
    <div class="graph-item">
      <h3>Infectious Disease</h3>
      <img src="" alt="">
    </div>
  </div>
</section>

<section class="parallax-bg" style=""></section>

<section class="our-team">
  <div class="our-team-wrapper">
    <article>
      <h2>Our Team</h2>
      <h3>Locus Biosciences has assembled an experienced team of leaders in CRISPR, antibacterial drug development, and biotech finance to drive our products into clinical development.</h3>
    </article>

    <?php echo do_shortcode('[a-team-showcase id="103"]') ?>
  </div>
</section>

<section class="careers" style="background-image: url('')">
  <div class="careers-content">
    <h4>Help us revolutionize medical science</h4>
    <div class="btn">
      <a href="#">Our Current Openings</a>
    </div>
  </div>
</section>

<section class="partners">
  <div class="partners wrapper">
    <h4>Our Investors & Partners</h4>
    <ul class="partner-list">
      <li><img src="" alt=""></li>
    </ul>
    <div class="btn">
      <a href="#">Partner with us</a>
    </div>
  </div>
</section>


<?php get_footer(); ?>
