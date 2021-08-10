<section id="atlas" class="lighter-blue tech-info">
  <a name="atlas" class="anchor-link"></a>
  <header>
    <h3><?php the_field('atlas_title'); ?></h3>
    <div class="header-image" style="background-image: url(<?php echo get_field('atlas_header_image')['url']; ?>)"></div>
  </header>
  <div class="article-wrapper">
    <?php $articles = get_field('atlas_articles'); ?>
    <?php if ( $articles ) : ?>
      <?php foreach ( $articles as $article ) : ?>
        <div id="<?php echo convertToAnchor($article['title']); ?>" class="article-item">
          <article>
            <h2><?php echo $article['title']; ?></h2>
            <h3><?php echo $article['sub-title']; ?></h3>
            <?php echo $article['content']; ?>
          </article>
          <div class="article-image">
            <?php $video = $article['video']; ?>
            <?php if ( $video ) : ?>
              <div class="inline-video-container">
                <div class="inline-video" data-url="<?php echo $video; ?>">
                  <div class="play-youtube">
                    <svg viewBox="0 0 41.999 41.999">
                      <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
                      c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
                      c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
                    </svg>
                  </div>
                </div>
              </div>
            <?php else: ?>
              <img <?php responsive_image( $article['image']['id'],'device','1440px'); ?> alt="<?php echo $article['image']['title']; ?>">
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</section>