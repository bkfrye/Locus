<?php get_header(); ?>
<section class="wrapper">
	<div class="site-content single" style="padding: 15px;margin-top: 100px;">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				if ( get_post_format() == false ) {
					get_template_part( 'content', 'single' );
				} else {
					get_template_part( 'content', get_post_format() );
				}
		endwhile;
		else :
			get_template_part( 'content', 'none' );
		endif;
		?>
	</div>
</section>
<?php get_footer(); ?>
