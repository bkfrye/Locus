<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110577987-1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-110577987-1');
	</script> -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<?php wp_head(); ?>
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png" type="image/png">
</head>

<body>
<header id="header" class="header">
	<div class="header-content">
    <div class="logo-wrapper">
  		<a href="<?php echo home_url(); ?>" class="logo">
  			<?php get_template_part('img/logo.svg'); ?>
  		</a>
    </div>

    <?php if ( has_nav_menu( 'main-menu' ) ) : ?>
      <?php wp_nav_menu( array(
        'theme_location' => 'main-menu',
        'container' => 'nav',
        'container_class' => 'main-menu',
        'container_id' => false,
        'menu_class' => false,
        'menu_id' => false,
        'menu_item_class' => false,
      ) ); ?>
    <?php endif; ?>
	</div>
</header>
<?php //edit_post_link( 'Edit', '<p class="edit-button">', '</p>' ); ?>
