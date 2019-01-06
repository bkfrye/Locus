<article class="grid-item post">
	<div class="inner-content">
    <h3 class="news-date"><?php echo get_the_date(); ?></h3>
    <?php if (get_the_content()) : ?>
      <h2><?php the_title(); ?></h2>
      <?php echo '<p>' . get_the_excerpt() . '</p>'; ?>
      <div class="text-link">
        <a href="<?php echo get_permalink(); ?>">
          Read More
        </a>
      </div>

    <?php else : ?>
      <h2><?php the_title(); ?></h2>
    <?php endif; ?>


    <?php $newsLink = get_field('news_url'); ?>
    <?php if ( $newsLink ) : ?>
      <a href="<?php echo $newsLink; ?>" target="_blank">
        <?php getMetaData($newsLink); ?>
      </a>
    <?php endif; ?>
	</div>
</article>
