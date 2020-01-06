<article>
	<div class="media-list-item">
		<div class="list-item-content">
	    <p class="news-date"><?php echo get_the_date(); ?></p>
	    <h2><?php the_title(); ?></h2>
		</div>
		<div class="inline-link">
			<a href="<?php the_field('news_url'); ?>" target="_blank">More
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none"><g fill="#1E5CE5"><path d="M7 1.7L7.7 1C8.1 0.7 8.6 0.7 8.9 1L15.3 7.4C15.7 7.7 15.7 8.3 15.3 8.6L8.9 15C8.6 15.3 8.1 15.3 7.7 15L7 14.3C6.7 14 6.7 13.5 7 13.2L11 9.3 1.5 9.3C1 9.3 0.7 9 0.7 8.5L0.7 7.5C0.7 7 1 6.7 1.5 6.7L11 6.7 7 2.8C6.7 2.5 6.7 2 7 1.7Z"/></g></g></svg>
				</span>
			</a>
		</div>
	</div>
</article>
