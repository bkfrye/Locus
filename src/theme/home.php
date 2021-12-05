<?php get_header(); ?>
<div id="media">
  <div class="media-hero">
    <div class="media-hero-wrapper">
      <div class="featured-news">
        <?php
          $sticky = get_option( 'sticky_posts' );
          $args = array(
                  'posts_per_page' => 1,
                  'post__in' => $sticky,
                  'ignore_sticky_posts' => 1
          );
          $query = new WP_Query( $args );

          if ( isset( $sticky[0] ) ) :
        ?>
          <section id="featured-news-callout">
            <div class="callout-wrapper">
              <h2>Featured news</h2>
              <?php
                  echo '<div>';
                  if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post();
                    echo '<h3>' . get_the_title() . '</h3>';
                    echo '<div class="btn"><a href="' . get_the_permalink() . '">Learn More</a></div>';
                  endwhile; endif;
                  echo '</div>';
              ?>
            </div>
          </section>
        <?php 
          else:
            $recent_posts = wp_get_recent_posts(array(
              'numberposts' => 1,
              'post_status' => 'publish'
            ));
            foreach( $recent_posts as $recent_post ) :
              get_template_part( 'content-featured', get_post_format() );
            endforeach;
          endif;
          wp_reset_postdata();
        ?>
      </div>
      <div class="media-kit">
        <h3>Media Kit</h3>
        <h2>Looking for our media kit?</h2>
        <div class="btn white">
          <a href="<?php echo site_url(); ?>/wp-content/Locus_Biosciences_Media_Kit.zip" target="_blank">Download here</a>
        </div>
      </div>
    </div>
  </div>

	<div class="site-content wrapper">


		<section class="news-link-wrapper">
			<?php
      $current_page = get_query_var('paged');
      $current_page = max( 1, $current_page );

      $per_page = 10;
      $offset_start = 1;
      $offset = ( $current_page - 1 ) * $per_page + $offset_start;

      $post_list = new WP_Query(array(
          'posts_per_page' => $per_page,
          'paged'          => $current_page,
          'offset'         => $offset,
          'ignore_sticky_posts' => 1
      ));

      $total_rows = max( 0, $post_list->found_posts - $offset_start );
      $total_pages = ceil( $total_rows / $per_page );


      if ( $post_list->have_posts() ) :
        while ( $post_list->have_posts() ):
          $post_list->the_post();
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
			<?php echo paginate_links( array(
        'total'   => $total_pages,
        'current' => $current_page,
      )); 
      wp_reset_postdata();
      ?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
