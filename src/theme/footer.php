<footer class="footer">
  <section class="footer-main">
    <div class="footer-wrapper">
      <div class="footer-main-left-col">
        <div class="footer-logo">
          <?php get_template_part('img/logo.svg'); ?>
        </div>
        <div class="footer-main-contact">
          <div class="information">
            <p><?php the_field('address', 'option'); ?></p>

            <div class="contact-links">
              <ul class="contact">
                <li>
                  <a href="tel:<?php the_field('phone', 'option'); ?>"><?php the_field('phone', 'option'); ?></a>
                </li>
                <li>
                  <a href="<?php the_field('email', 'option'); ?>"><?php the_field('email', 'option'); ?></a>
                </li>
              </ul>
              <div class="social">
                <div class="social">
                  <div class="icon">
                    <a href="https://www.linkedin.com/company/locus-biosciences-inc./" target="_blank">
                      <svg class="icon-linkedin" viewBox="0 0 382 382">
                        <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
                        	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
                        	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
                        	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
                        	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
                        	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
                        	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
                        	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
                        	L341.91,330.654L341.91,330.654z"/>
                      </svg>
                    </a>
                  </div>
                  <div class="icon">
                    <a href="https://twitter.com/LocusBio" target="_blank">
                      <svg class="icon-twitter" viewBox="0 0 512 512">
                      	<path d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                      		c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                      		c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                      		c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                      		c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                      		c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                      		C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                      		C480.224,136.96,497.728,118.496,512,97.248z"/>
                      </svg>
                    </a>
                  </div>
                  <div class="icon">
                    <a href="https://www.youtube.com/channel/UCuqefNAIlrrGGmIqpAI2FWQ/featured" target="_blank">
                      <svg id="icon-youtube" viewBox="0 0 310 310">
                        <path id="XMLID_823_" d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938
                      	C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527
                      	C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991
                      	c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764
                      	c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861
                      	C204.394,157.263,202.325,160.684,199.021,162.41z"/>
                      </svg>

                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="footer-main-right-col">
        <?php if ( has_nav_menu( 'secondary-menu' ) ) : ?>
          <?php wp_nav_menu( array(
            'theme_location' => 'secondary-menu',
            'container' => 'nav',
            'container_class' => 'main-menu',
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

<?php get_template_part('template_parts/video-box'); ?>
<?php get_template_part('template_parts/contact-form'); ?>

<?php wp_footer(); ?>
</body>
</html>
