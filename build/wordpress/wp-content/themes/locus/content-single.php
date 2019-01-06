<article class="single">
  <header>
  	<h1 class="single-title"><?php the_title(); ?></h1>

  	<p class="post-info">
  		<span class="date">
  			<?php the_time( 'F j, Y' ); ?>
  		</span>

  		<!-- <span class="tags"> -->
  			<?php
  				// $categories = get_the_category();
  				//$separator  = ', ';
  				//$output     = '';

  			//if ( $categories ) {
  				// foreach ( $categories as $category ) {
  				// 	$output .= '<a href="' . get_category_link( $category->term_id ) . '">' . $category->cat_name . '</a>' . $separator;
  				// }

  			// 	echo trim( $output, $separator );
  			// }
  			?>
  		<!-- </span> -->
  	</p>
  </header>

	<?php //the_post_thumbnail( 'banner-image' ); ?>

	<div class="post-inner-content">
		<?php the_content(); ?>
	</div>
</article>
