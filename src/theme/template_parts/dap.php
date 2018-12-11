<section class="dap tech-info">
  <header class="fade-in load-hidden">
    <h3><?php the_field('discovery_title'); ?></h3>
    <div class="header-image" style="background-image: url(<?php echo get_field('dap_header_image')['url']; ?>)"></div>
  </header>
  <div class="article-wrapper">
    <?php $articles = get_field('dap_articles'); ?>
    <?php if ( $articles ) : ?>
      <?php foreach ( $articles as $article ) : ?>
        <div class="article-item fade-in load-hidden">
          <article>
            <h2><?php echo $article['title']; ?></h2>
            <h3><?php echo $article['sub-title']; ?></h3>
            <?php echo $article['content']; ?>
          </article>
          <div class="article-image fade-in load-hidden">
            <img src="<?php echo $article['image']['url']; ?>" alt="<?php echo $article['image']['alt']; ?>">
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>

  <div id="bacteriophage">
    <div class="content-video">
      <div class="wrapper">
        <article>
          <?php $i = 0; ?>
          <?php if ( have_rows('video_content_dap') ) : ?>
            <?php while ( have_rows('video_content_dap') ) : the_row(); ?>
              <?php if( get_row_layout() == 'paragraph' ) : ?>
                <div class="fade-in load-hidden">
                  <?php the_sub_field('text'); ?>
                </div>
              <?php elseif ( get_row_layout() == 'video' ) : the_sub_field('text'); ?>
                <?php $i++; ?>
              	<?php $file = get_sub_field('poster');  $video = get_sub_field('url'); ?>
                <?php if ($video && $file) : ?>
                  <div class="inline-video fade-in load-hidden" data-url="<?php echo $video; ?>" data-poster="<?php echo $file['url']; ?>">
                    <video id='inline-video-<?php echo $i;?>' class='video-js'></video>
                  </div>
                <?php endif; ?>
              <?php endif; ?>
            <?php endwhile; ?>
          <?php endif;?>
        </article>
      </div>
    </div>
  </div>
</section>