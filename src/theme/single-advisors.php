<?php get_header(); ?>
<section class="wrapper">
	<div class="site-content" style="padding: 15px;margin-top: 100px;">
		<div class="employee-bio-panel">
			<div class="employee-bio-wrapper">
				<header class="employee-bio">
					<div class="employee-image">
						<?php
							$image = get_field('profile_image');
							$size = 'medium'; // (thumbnail, medium, large, full or custom size)
							if( $image ) {
								echo wp_get_attachment_image( $image, $size );
							}
						?>
					</div>
					<div>
						<p class="employee-role"><?php echo str_replace('_', ' ', $type);?></p>
						<?php the_title('<h3 class="employee-name">','</h3>'); ?>
						<p class="employee-title">
							<?php the_field('role');?>
						</p>
					</div>
				</header>
				<div class="employee-content"><?php the_field('biography');?></div>
			</div>
		</div>
	</div>
</section>
<?php get_footer(); ?>
