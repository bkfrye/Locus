<?php get_header(); ?>
<section id="media" class="wrapper">
  <div class="media-hero">
    <div class="featured-news">
      <h1>Featured News</h1>

      <h2>POST TITLE</h2>
    </div>
    <div class="media-kit">
      <h3>Media Kit</h3>
      <h2>Looking for media kit?</h2>
    </div>
  </div>

	<div class="site-content">

		<div class="main-column grid">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part( 'content', get_post_format() );
				endwhile;
				?>
		</div>

		<?php
		else :
			get_template_part( 'content', 'none' );
		endif;
		?>

		<div class="pagination side">
			<?php echo paginate_links(); ?>
		</div>
	</div>
</section>

<?php get_footer(); ?>
