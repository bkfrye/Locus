<?php get_header(); ?>
<section class="wrapper">
	<div class="site-content page">
		<?php
		if (have_posts()) :
			while (have_posts()) :
				the_post();
				get_template_part('content', 'page');
			endwhile;
			else :
				get_template_part('content', 'none');
			endif;
			?>
	</div>
</section>
<?php get_footer(); ?>
