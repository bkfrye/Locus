<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<?php wp_head(); ?>
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png" type="image/png">
</head>

<body <?php if (is_paged()) : echo 'class="paged"'; endif; ?>>
  
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
      <div id="menu-btn">
        <svg class="open" viewBox="0 0 53 53">
        	<path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z"/>
        	<path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z"/>
        	<path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z"/>
        </svg>
        <svg class="close" viewBox="0 0 64 64">
          <path d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
        </svg>
      </div>
  	</div>
  </header>
<?php //edit_post_link( 'Edit', '<p class="edit-button">', '</p>' ); ?>
