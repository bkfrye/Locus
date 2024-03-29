<?php get_header(); ?>
<section>
	<div class="site-content wrapper">
		<div class="main-column grid">


			<section class="main-column grid">
				<?php
					if (have_posts()) :
						while (have_posts()) :
							the_post();
							get_template_part('content', get_post_format());
					endwhile;
					else :
						get_template_part('content', 'none');
					endif;
				?>
			</section>


			<div class="pagination side">
				<?php echo paginate_links(); ?>
			</div>
		</div>
	</div>
</section>
<?php get_footer(); ?>
