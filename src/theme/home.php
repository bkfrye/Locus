<?php get_header(); ?>
<div id="media">
  <div class="media-hero">
    <div class="media-hero-wrapper">
      <div class="featured-news">

        <?php
          $post_link = get_field('featured_link_post', get_option('page_for_posts'));
          if( $post_link ): $link = $post_link; setup_postdata( $link );
        ?>
            <h1>Featured News</h1>
              <div class="featured-news-content">
              	<h2 class="featured-headline"><?php echo $link->post_title; ?></h2>
                <div class="btn white">
                  <a href="<?php echo $post_link -> news_url ?>" target="_blank">Read More</a>
                </div>
              </div>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>
      </div>
      <div class="media-kit">
        <h3>Media Kit</h3>
        <h2>Looking for media kit?</h2>
        <div class="btn white">
          <a href="//dev.locus-bio.com/wp-content/Locus_Biosciences_Media_Kit.zip" target="_blank">Download here</a>
        </div>
      </div>
    </div>
  </div>

	<div class="site-content wrapper">

		<section class="link-wrapper">
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

		<div class="pagination">
			<?php echo paginate_links(); ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
