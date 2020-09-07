<?php get_header(); ?>
<?php $about_bg = get_field('about_hero_image'); ?>
<div class="about-us-hero" style="background-image: url('<?php echo $about_bg; ?>')">
  <div class="about-hero-wrapper">
    <h1 class=""><?php the_field('about_main_headline'); ?></h1>
    <h3><?php the_field('about_main_sub-headline'); ?></h3>
    <div class="btn white">
      <a href="#about">Read More</a>
    </div>
  </div>

</div>
<section id="about" class="about-us">
  <div class="about-us-wrapper">
    <article>
      <h2><?php echo __('About Us'); ?></h2>
      <h3><?php the_field('about_headline'); ?></h3>
      <?php the_field('about_content'); ?>

    </article>

    <aside>
      <div>
        <?php $video = get_field('about_video'); ?>
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
        <?php endif; ?>
      </div>
    </aside>
  </div>

  <div class="learn-more">
    <div class="wrapper">
      <div class="card">
        <h3>crPhage</h3>
        <p>Our CRISPR-Cas3 enhanced bacteriophage products kill target bacteria by irreversibly destroying their DNA, while leaving the many species of good bacteria in the body unharmed</p>

        <div class="inline-link">
    			<a href="<?php echo site_url(); ?>/technology">More
    				<span>
    					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
    				</span>
    			</a>
    		</div>
      </div>
      <div class="card">
        <h3>Pipeline</h3>
        <p>Robust asset pipeline that hits both infectious disease and microbiome targets</p>

        <div class="inline-link">
    			<a href="<?php echo site_url(); ?>/#pipeline">More
    				<span>
    					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
    				</span>
    			</a>
    		</div>
      </div>
    </div>
  </div>

  <?php get_template_part('template_parts/employees/index'); ?>

  <div id="overlay"></div>
  <div id="bio-view">
    <div id="close-panel">
      <svg width="75" height="17" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M30.574 7.988c0-2.884 2.184-5.096 5.11-5.096 2.422 0 3.668 1.358 3.668 1.358l-.868 1.344s-1.134-1.05-2.716-1.05c-2.1 0-3.332 1.568-3.332 3.416 0 1.89 1.274 3.556 3.346 3.556 1.722 0 2.884-1.26 2.884-1.26l.952 1.302s-1.372 1.61-3.906 1.61c-3.038 0-5.138-2.254-5.138-5.18zM41.284 13V3.06h1.806v8.386h4.298V13h-6.104zm6.86-5.04c0-2.842 2.212-5.068 5.138-5.068 2.926 0 5.138 2.226 5.138 5.068 0 2.926-2.212 5.208-5.138 5.208-2.926 0-5.138-2.282-5.138-5.208zm1.862 0c0 2.044 1.456 3.556 3.276 3.556 1.82 0 3.276-1.512 3.276-3.556 0-1.96-1.456-3.416-3.276-3.416-1.82 0-3.276 1.456-3.276 3.416zm9.492 3.85l.98-1.358s1.078 1.05 2.478 1.05c.756 0 1.442-.392 1.442-1.204 0-1.778-4.69-1.47-4.69-4.522 0-1.652 1.428-2.884 3.332-2.884 1.96 0 2.968 1.064 2.968 1.064l-.784 1.47s-.952-.868-2.198-.868c-.84 0-1.498.49-1.498 1.19 0 1.764 4.676 1.33 4.676 4.508 0 1.582-1.204 2.912-3.276 2.912-2.212 0-3.43-1.358-3.43-1.358zM68.01 13V3.06h5.95v1.554h-4.144v2.604h3.346v1.554h-3.346v2.674h4.368V13H68.01z" fill="#181B20"/><g fill="#02273A" fill-rule="nonzero"><path d="M17.77 8.185a.268.268 0 01.001-.378l-.19.189.19.189zm-1.182-.189l-5.845-5.828A1.12 1.12 0 1112.327.584l6.53 6.511a1.27 1.27 0 010 1.801l-6.95 6.93a1.12 1.12 0 01-1.645-.067c-.39-.458-.329-1.127.08-1.535l6.246-6.228z"/><path d="M8.54 7.928a.268.268 0 010-.378l-.19.19.19.188zM7.356 7.74L1.512 1.91A1.12 1.12 0 113.096.327l6.53 6.512a1.27 1.27 0 010 1.8l-6.95 6.931a1.12 1.12 0 01-1.645-.067c-.39-.459-.33-1.128.08-1.536L7.357 7.74z"/></g></g></svg>
    </div>
    <div id="bio-view-content"></div>
  </div>

  <div class="work-for-us">
    <div class="wrapper">
      <h3>Want to work with us?</h3>
      <div class="btn">
        <a href="<?php echo site_url(); ?>/careers">view our openings</a>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
