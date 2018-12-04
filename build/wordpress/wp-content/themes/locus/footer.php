<footer class="footer">
  <?php if (is_front_page) : ?>
  	<section class="footer-contact">
      <div class="footer-wrapper">
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
      </div>
    </section>
  <?php endif; ?>
  <section class="footer-main">
    <div class="footer-wrapper">
      <div class="footer-main-left-col">
        <div class="footer-logo">
          <?php get_template_part('img/logo.svg'); ?>
        </div>
        <div class="footer-main-contact">
          <div class="information">
            <p>7020 Kit Creek Road, Suite 210<br/>
            Research Triangle Park, NC</p>

            <div class="contact-links">
              <div class="contact">
                <a href="tel:9193139648">(919) 313-9648</a>
                <a href="mailto:info@locus-bio.com">info@locus-bio.com</a>
              </div>
              <div class="social"></div>
            </div>

          </div>
        </div>
      </div>
      <div class="footer-main-right-col">
        <?php if ( has_nav_menu( 'main-menu' ) ) : ?>
          <?php wp_nav_menu( array(
            'theme_location' => 'main-menu',
            'container' => 'nav',
            'container_class' => 'main-menu',
            'container_id' => false,
            'menu_class' => false,
            'menu_id' => false,
            'menu_item_class' => false,
          ) ); ?>
        <?php endif; ?>
        <?php if ( has_nav_menu( 'secondary-menu' ) ) : ?>
          <?php wp_nav_menu( array(
            'theme_location' => 'secondary-menu',
            'container' => 'nav',
            'container_class' => 'secondary-menu',
            'container_id' => false,
            'menu_class' => false,
            'menu_id' => false,
            'menu_item_class' => false,
          ) ); ?>
        <?php endif; ?>
      </div>
    </div>
    <div class="copyright">
      <p>&copy;COPYRIGHT <?php echo date("Y"); ?> LOCUS BIOSCIENCES, INC. ALL RIGHTS RESERVED.</p>
    </div>
  </section>
</footer>
<?php wp_footer(); ?>
</body>
</html>
