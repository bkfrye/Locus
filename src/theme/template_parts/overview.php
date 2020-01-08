<section id="overview" class="overview">
  <?php $items = get_field('overview_items'); ?>
  <?php if ($items) : ?>
    <?php foreach( $items as $item ) : ?>
      <div class="overview-item" style="background-image: url('<?php echo $item['background_image']; ?>')" data-aos="fade-up">
        <div class="overview-item-content">
          <p class="item-title"><?php echo $item['title']; ?></p>
          <p><?php echo $item['content']; ?></p>
          <div class="text-link white">
            <a href="<?php echo $item['link']; ?>">More</a>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</section>