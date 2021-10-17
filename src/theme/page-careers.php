<?php get_header(); ?>
<?php $careers_bg = get_field('careers_bg_image'); ?>
<div class="careers-hero" style="background-image: url('<?php echo $careers_bg; ?>')">
  <div class="careers-hero-wrapper">
    <h1><?php the_field('careers_headline'); ?></h1>
    <p><?php the_field('careers_content'); ?></p>
    <div class="btn white play">
      <div class="btn-content" data-url="<?php the_field('work_video_url'); ?>">
        <span style="margin-right: 9px;margin-bottom: -2px;display: block;">
          <svg width="12px" height="14px" viewBox="0 0 12 14">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-673.000000, -525.000000)" fill="#03487E">
                      <polygon id="Triangle" transform="translate(679.000000, 532.000000) rotate(-270.000000) translate(-679.000000, -532.000000) " points="679 526 686 538 672 538"></polygon>
                  </g>
              </g>
          </svg>
        </span>
        <?php echo __('Hear from the team'); ?>
      </div>
    </div>
  </div>
</div>

<div id="recruitee-careers" class="careers-listing"></div>

<script type="text/javascript">
  var rtscript = document.createElement('script');
  rtscript.type = 'text/javascript';
  rtscript.onload = function() {
    var widget = new RTWidget({
      "companies": [
        69330
      ],
      "detailsMode": "overlay",
      "language": "en",
      "departmentsFilter": [],
      "themeVars": {
        "primary": "#0d2b4a",
        "secondary": "#8497b0",
        "text": "#0d2b4a",
        "textDark": "#0d2b4a",
        "baseFontSize": "16px"
      },
      "flags": {
        "showLocation": true,
        "showCountry": true,
        "showCity": true,
        "groupByLocation": false,
        "groupByDepartment": true,
        "groupByCompany": false
      }
    })
  };

  rtscript.src = 'https://d10zminp1cyta8.cloudfront.net/widget.js';
  document.body.appendChild(rtscript);
</script>
<?php get_footer(); ?>
