<?php get_header(); ?>
<section id="news" class="wrapper">
  <h1>Blog</h1>
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
