<?php get_header(); ?>


  <section id="careers">
    <h1><?php the_title(); ?></h1>

    <?php the_content(); ?>

    <ul class="accordion">
      <li>
        <div class="clickable">
          Panel 1
        </div>

        <div class="accordion-content">Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</div>
      </li>
      <li>
        <div class="clickable">
          Panel 2
        </div>

        <div class="accordion-content">Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</div>
      </li>
      <li>
        <div class="clickable">
          Panel 3
        </div>

        <div class="accordion-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</div>
      </li>

    </ul>

  </section>
<?php get_footer(); ?>
