<?php get_header(); ?>

<section class="hero" style="background-image: url()">
  <div class="hero-wrapper">
    <h1>Introducing crPhage</h1>
    <p>CRISPR-engineered precision antibacterial products
to revolutionize the treatment of disease</p>
    <div class="btn play">
      <a href="#">See How It Works</a>
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
        <a href="#">Watch Video</a>
      </div>
    </aside>
  </div>
</section>

<section class="overview">
  <div class="overview-item" style="background-image: url('')">
    <p class="item-title">Our Platform</p>
    <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
    <div class="text-link">
      <a href="#">More</a>
    </div>
  </div>
  <div class="overview-item" style="background-image: url('')">
    <p class="item-title">Our Platform</p>
    <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
    <div class="text-link">
      <a href="#">More</a>
    </div>
  </div>
  <div class="overview-item" style="background-image: url('')">
    <p class="item-title">Our Platform</p>
    <p>Cas3 is a powerful exonuclease that shreds targeted DNA beyond repair, leading to a designated cell’s rapid elimination</p>
    <div class="text-link">
      <a href="#">More</a>
    </div>
  </div>
</section>

<section class="parallax-bg" style="background-image: url('')"></section>

<section class="our-pipeline">
  <div class="our-pipeline-wrapper">
    <article>
      <h2>Our Pipeline</h2>
      <h3>Locus Biosciences’ crPhage platform has the potential to revolutionize medical science in two critical areas. </h3>
      <?php // the_field('our_pipline_content'); ?>
      <p>The first is infectious diseases.

      <p>Our lead program targeting Escherichia coli will enter clinical development in the first half of 2019 with a Phase 1b clinical trial in patients colonized with E. coli in their urinary tracts. </p>

      <p>We also have crPhage development programs targeting Clostridium difficile, Pseudomonas aeruginosa, Staphylococcus aureus, and other ESKAPE pathogens.</p>

      <p>The second area is microbiome-related disease. Our additional crPhage programs are aimed at undisclosed bacterial targets relevant for inflammatory bowel disease (IBD) and other disorders causes by dysbiosis of the microbiome in gastrointestinal, immunology, oncology, and central nervous system therapy areas.</p>
    </article>

    <aside>
      <div class="aside-image">
        <img src="" alt="">
      </div>
      <div class="aside-content">
        <h3>What we do</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>

        <div class="btn play">
          <a href="#">Watch Video</a>
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

<section class="parallax-bg" style="background-image: url('')"></section>

<section class="our-team">
  <div class="our-team-wrapper">
    <article>
      <h2>Our Team</h2>
      <h3>Locus Biosciences has assembled an experienced team of leaders in CRISPR, antibacterial drug development, and biotech finance to drive our products into clinical development.</h3>
    </article>

    <?php get_template_part('template_parts/team-members'); ?>
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
