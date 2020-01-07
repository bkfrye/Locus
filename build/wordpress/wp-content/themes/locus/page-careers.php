<?php get_header(); ?>
<?php $careers_bg = get_field('careers_bg_image'); ?>
<div class="careers-hero" style="background-image: url('<?php echo $careers_bg; ?>')">
  <div class="careers-hero-wrapper">
    <h1><?php the_field('careers_headline'); ?></h1>
    <p><?php the_field('careers_content'); ?></p>
    <div class="btn white">
      <a href="#listing">View our openings</a>
    </div>
  </div>
</div>

  <div class="careers-page-content">
    <section class="careers-content wrapper">
      <div class="careers-content-copy">
        <h2><?php the_title(); ?></h2>
        <h3>Why work with us?</h3>
        <?php the_field('why_work_content'); ?>
      </div>

      <?php $video = get_field('work_video_url'); ?>
      <?php if ( $video ) : ?>
        <div class="inline-video-container careers-video">
          <div class="inline-video fade-in load-hidden" data-url="<?php echo $video; ?>">
            <div class="play-youtube">
              <svg viewBox="0 0 41.999 41.999">
                <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
                c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
                c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
              </svg>
            </div>
          </div>
        </div>
      <?php endif ?>
    </section>

    <!-- <section class="blockquote">
      <p>quote</p>

      <div class="quote-author-bio">
        <img src="" alt="">
        <p>paul garrafalo</p>
      </div>
    </section> -->







    <section id="listing" class="careers-listing">
      <h2>Current Openings</h2>
      <?php $jobs = get_field('jobs'); ?>
      <?php if ( $jobs ) : ?>
        <ul class="accordion">
          <?php foreach ( $jobs as $job ) : ?>

            <li class="job-item">
              <div class="clickable">
            		<div class="list-item-content">
                  <h3><?php echo $job['job_title']; ?></h3>
                  <div class="job-info">
                    <p>Type: <?php echo $job['type']; ?></p>
                    <p>Location: <?php echo $job['location']; ?></p>
                  </div>
            		</div>
                <div class="list-item-link">
              		<div class="inline-link">
                    <p>Read More
                    <span>
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                              <g id="Careers" transform="translate(-924.000000, -2077.000000)" stroke="#1E5CE5" stroke-width="3">
                                  <g id="Group-7" transform="translate(926.000000, 2079.000000)">
                                      <line x1="7" y1="0" x2="7" y2="14" id="Line"></line>
                                      <line x1="14" y1="7" x2="0" y2="7" id="Line-Copy"></line>
                                  </g>
                              </g>
                          </g>
                      </svg>
                    </span>
                    </p>
              		</div>
                </div>
              </div>
              <div class="accordion-content">
                <?php echo $job['description']; ?>
              </div>
          	</li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>
    </section>
  </div>
<?php get_footer(); ?>
