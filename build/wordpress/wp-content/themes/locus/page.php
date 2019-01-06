<?php get_header(); ?>
<!-- container -->
<section class="wrapper">
	<!-- site-content -->
	<div class="site-content page">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				get_template_part( 'content', 'page' );
			endwhile;
			else :
				get_template_part( 'content', 'none' );
			endif;
			?>
	</div>
	<!-- /site-content -->
</section>
<!-- /container -->
<?php get_footer(); ?>
