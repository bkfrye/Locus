<?php get_header(); ?>
<div id="media">
  <div class="media-hero" style="background-image: url('')">
    <div class="media-hero-wrapper">
      <div class="featured-news">

        <?php
        echo '<pre>';
            print_r( get_field('featured_link_media')  );
        echo '</pre>';
        die;
          $post_link = the_field('featured_link_media');
          if( $post_link ):
          	$link = $post_link;
          	setup_postdata( $link );
          	?>
            <h1>Featured News</h1>
              <div>
              	<h2 class="featured-headline"><?php the_title(); ?></h2>
                <div class="btn white">
                  <a href="<?php the_field('news_url'); ?>" target="_blank">Read More</a>
                </div>
              </div>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>
      </div>
      <div class="media-kit">
        <h3>Media Kit</h3>
        <h2>Looking for media kit?</h2>
        <div class="btn white">
          <a href="#">Download here</a>
        </div>
      </div>
    </div>
  </div>

	<div class="site-content wrapper">

		<section class="main-column grid">
			<?php
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

		<div class="pagination side">
			<?php echo paginate_links(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
