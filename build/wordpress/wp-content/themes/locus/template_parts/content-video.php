<div class="content-video">
  <div class="wrapper">
    <article>
      <?php if ( have_rows('video_content_dap') ) : ?>
        <?php while ( have_rows('video_content') ) : the_row(); ?>
          <?php if( get_row_layout() == 'paragraph' ) : ?>
          	<?php the_sub_field('text'); ?>
          <?php elseif ( get_row_layout() == 'video' ) : the_sub_field('text'); ?>
          	<?php $file = get_sub_field('poster');  $video = get_sub_field('url'); ?>
            <div class="inline-video" data-url="<?php echo $video; ?>" data-poster="<?php echo $file['url']; ?>"></div>
          <?php endif; ?>
        <?php endwhile; ?>
      <?php endif;?>
      <?php if ( have_rows('video_content_sbm') ) : ?>
        <?php while ( have_rows('video_content') ) : the_row(); ?>
          <?php if( get_row_layout() == 'paragraph' ) : ?>
          	<?php the_sub_field('text'); ?>
          <?php elseif ( get_row_layout() == 'video' ) : the_sub_field('text'); ?>
          	<?php $file = get_sub_field('poster');  $video = get_sub_field('url'); ?>
            <div class="inline-video" data-url="<?php echo $video; ?>" data-poster="<?php echo $file['url']; ?>"></div>
          <?php endif; ?>
        <?php endwhile; ?>
      <?php endif;?>
    </article>
  </div>
</div>