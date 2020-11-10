<?php get_header(); ?>

<section class="not-found">
	<div class="wrapper">
    <div class="content">
		  <h1><?php _e( 'Oops! Phage not working!', 'locus' ); ?></h1>
      <div class="link-out">
        <div class="btn">
          <a href="/">Go to Homepage</a>
        </div>
        <div class="btn">
          <a href="/technology">Our Technology</a>
        </div>
				<div class="btn">
          <a href="/technology">Our Manufacturing</a>
        </div>
      </div>
    </div>
    <div style="margin: 0 auto; max-width: 400px;">
      <img src="<?php echo get_template_directory_uri(); ?>/img/phage.png" />
    </div>

	</div>
</section>
<?php get_footer(); ?>
