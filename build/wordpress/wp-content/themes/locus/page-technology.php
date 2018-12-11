<?php get_header(); ?>
<div id="technology">
  <?php if ( get_field('background_image') ) : ?>
    <section id="top" class="hero" style="background-image: url('<?php the_field('background_image'); ?>')">
  <?php else : ?>
    <section id="top" class="hero" style="background-color: gray;">
  <?php endif; ?>
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1><?php the_title(); ?></h1>
        <p><?php the_field('sub-headline'); ?></p>

        <div class="hero-btn-wrapper">
          <?php if ( get_field('button_1') ) : ?>
            <div class="btn white">
              <a href="#bacteriophage">
                <?php the_field('button_1'); ?>
              </a>
            </div>
          <?php endif; ?>
          <?php if ( get_field('button_2') ) : ?>
            <div class="btn white">
              <a href="#cas-3">
                <?php the_field('button_2'); ?>
              </a>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <section class="our-platform">
    <div class="wrapper">
      <article>
        <h2>Our Platform</h2>
        <h3><?php the_field('platform_headline'); ?></h3>
      </article>
    </div>
  </section>

  <section class="platform-methods">
    <div class="wrapper">
      <div class="content-wrapper">
        <div class="content discovery">
          <div class="content-image">
            <img src="<?php echo get_field('dap_header_image')['url']; ?>" alt="">
          </div>
          <p><?php the_field('discovery_title'); ?></p>
          <?php the_field('discovery_content'); ?>
        </div>
        <div class="content methods">
          <img src="<?php the_field('image_2'); ?>" alt="">
          <p><?php the_field('methods_title'); ?></p>
          <?php the_field('methods_content'); ?>
        </div>
      </div>
      <h3><?php the_field('development_time'); ?></h3>
    </div>
  </section>

  <section class="dap tech-info">
    <header>
      <h3><?php the_field('discovery_title'); ?></h3>
      <div class="header-image">
        <?php $img = get_field('dap_header_image'); ?>
        <img src="<?php echo $img['url']; ?>" alt="">
      </div>
    </header>
    <div class="article-wrapper">
      <?php $articles = get_field('dap_articles'); ?>
      <?php if ( $articles ) : ?>
        <?php foreach ( $articles as $article ) : ?>
          <div class="article-item">
            <article>
              <h2><?php echo $article['title']; ?></h2>
              <?php echo $article['content']; ?>
            </article>
            <div class="article-image">
              <img src="<?php echo $article['image']['url']; ?>" alt="<?php echo $article['image']['alt']; ?>">
            </div>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </section>



</div>

<?php get_footer(); ?>
