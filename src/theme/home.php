<?php get_header(); ?>
<div id="media">
  <div class="media-hero">
    <div class="media-hero-wrapper">
      <div class="featured-news">
        <?php
          $sticky = get_option( 'sticky_posts' );
          $args = array(
                  'posts_per_page' => 1,
                  'post__in' => $sticky,
                  'ignore_sticky_posts' => 1
          );
          $query = new WP_Query( $args );

          if ( isset( $sticky[0] ) ) :
        ?>
          <section id="featured-news-callout">
            <div class="callout-wrapper">
              <h2>Featured news</h2>
              <?php
                  echo '<div>';
                  if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
                    echo '<h3>' . get_the_title() . '</h3>';
                    echo '<div class="btn"><a href="' . get_the_permalink() . '">Learn More</a></div>';
                  endwhile; endif;
                  echo '</div>';
              ?>
            </div>
          </section>
        <?php 
          else:

            query_posts('posts_per_page=1');
            if ( have_posts() ) :
              while ( have_posts() ) :
                the_post();
                get_template_part( 'content-featured', get_post_format() );
              endwhile;
            endif;
          endif;
          wp_reset_postdata();
        ?>
      </div>
      <div class="media-kit">
        <h3>Media Kit</h3>
        <h2>Looking for our media kit?</h2>
        <div class="btn white">
          <a href="<?php echo site_url(); ?>/wp-content/Locus_Biosciences_Media_Kit.zip" target="_blank">Download here</a>
        </div>
      </div>
    </div>
  </div>

	<div class="site-content wrapper">

		<section class="news-link-wrapper">
			<?php
      query_posts('posts_per_page=10&offset=1');
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part( 'content', get_post_format() );
				endwhile;
      ?>
		</section>

		<?php
      else :
        get_template_part( 'content', 'none' );
      endif;
		?>

		<div class="pagination">
			<?php echo paginate_links(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
