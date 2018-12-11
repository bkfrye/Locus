<section class="sbm tech-info">
  <header>
    <h3><?php the_field('methods_title'); ?></h3>
    <div class="header-image" style="background-image: url(<?php echo get_field('methods_header_image')['url']; ?>)"></div>
  </header>
  <div class="article-wrapper">
    <?php $articles = get_field('sbm_articles'); ?>
    <?php if ( $articles ) : ?>
      <?php foreach ( $articles as $article ) : ?>
        <div class="article-item">
          <article>
            <h2><?php echo $article['title']; ?></h2>
            <h3><?php echo $article['sub-title']; ?></h3>
            <?php echo $article['content']; ?>
          </article>
          <div class="article-image">
            <img src="<?php echo $article['image']['url']; ?>" alt="<?php echo $article['image']['alt']; ?>">
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>

  <div id="cas-3">
    <div class="content-video">
      <div class="wrapper">
        <article>
          <?php $i = 100; ?>
          <?php if ( have_rows('video_content_sbm') ) : ?>
            <?php while ( have_rows('video_content_sbm') ) : the_row(); ?>
              <?php if( get_row_layout() == 'paragraph' ) : ?>
              	<?php the_sub_field('text'); ?>
              <?php elseif ( get_row_layout() == 'video' ) : the_sub_field('text'); ?>
                <?php $i++; ?>
              	<?php $file = get_sub_field('poster');  $video = get_sub_field('url'); ?>
                <div class="inline-video" data-url="<?php echo $video; ?>" data-poster="<?php echo $file['url']; ?>">
                  <video id='inline-video-<?php echo $i;?>' class='video-js'></video>
                </div>
              <?php endif; ?>
            <?php endwhile; ?>
          <?php endif;?>
        </article>
      </div>
    </div>
  </div>
</section>