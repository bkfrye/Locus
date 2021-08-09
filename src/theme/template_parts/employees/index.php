<section id="our-team" class="our-team">
  <div class="our-team-wrapper">
    <article>
      <h2><?php echo __('Meet The Team'); ?></h2>
      <h3><?php the_field('team_headline'); ?></h3>
    </article>

    <ul class="team-navigation">
      <li data-section="#management" class="js-active">Management</li>
      <li data-section="#board">Board of Directors</li>
      <li data-section="#founders">Scientific Founders</li>
      <li data-section="#advisors">Advisors</li>
      <li data-section="#team">Team</li>
    </ul>

    <div id="team-wrapper">
      <div id="management" class="employee-section js-active">
        <?php get_template_part('template_parts/employees/management'); ?>
      </div>
      <div id="board" class="employee-section">
        <?php get_template_part('template_parts/employees/board-of-directors'); ?>
      </div>
      <div id="founders" class="employee-section">
        <?php get_template_part('template_parts/employees/scientific-founders'); ?>
      </div>
      <div id="advisors" class="employee-section">
        <?php get_template_part('template_parts/employees/advisors'); ?>
      </div>
      <div id="team" class="employee-section">
        <?php get_template_part('template_parts/employees/team'); ?>
      </div>
    </div>
  </div>
</section>