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
