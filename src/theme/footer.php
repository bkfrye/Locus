<footer class="footer">
	<section class="footer-contact">
    <div class="information">
      <h3>Contact Us</h3>
      <p>7020 Kit Creek Road, Suite 210<br/>
      Research Triangle Park, NC</p>

      <div class="get-directions">
        <a href="#">Get Directions</a>
      </div>

      <div class="contact">
        <a href="tel:9193139648">(919) 313-9648</a>
        <a href="mailto:info@locus-bio.com">info@locus-bio.com</a>
      </div>

      <div class="social"></div>
    </div>
    <div class="map" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/img/map.png')">
    </div>
  </section>

  <section class="footer-main">
    <div class="footer-logo">
      <?php get_template_part('img/logo.svg'); ?>
    </div>
  </section>

  <?php get_template_part('img/helix.svg') ?>

</footer>
<?php wp_footer(); ?>
</body>
</html>
