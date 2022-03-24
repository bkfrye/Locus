<h1>Recent News</h1>
<div class="featured-news-content">
  <h2 class="featured-headline"><?php the_title(); ?></h2>
  <div class="btn white">
    <?php
      if ( get_field('news_url') ) :
        $news_url = get_field('news_url');
      else :
        $news_url = get_the_permalink();
      endif;
    ?>
    <a href="<?php echo $news_url; ?>" target="_blank">Read More</a>
  </div>
</div>
