<?php get_header(); ?>

<section class="not-found">
	<div class="wrapper">
    <div class="content">
		  <h1><?php _e( 'Oops! That page either can&rsquo;t be found or doesn&rsquo;t exist!', 'wordpressify' ); ?></h1>
      <div class="link-out">
        <div class="btn">
          <a href="/">Go to Homepage</a>
        </div>
        <div class="btn">
          <a href="/technology">Learn about our Technology</a>
        </div>
      </div>
    </div>
    <div class="bacteria">
      <?php get_template_part('img/404-asset.svg'); ?>
    </div>

	</div>
</section>
<?php get_footer(); ?>
