document.addEventListener("DOMContentLoaded", () => {

  // Select all links with hashes
  $('a[href*="#"]')
  	.not('[href="#"]')
  	.not('[href="#0"]')
  	.click(function(event) {
  		if (
  			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
  			location.hostname == this.hostname
  		) {
  			var target = $(this.hash);
  			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  			if (target.length) {
  				event.preventDefault();
  				$('html, body').animate({
  					scrollTop: target.offset().top
  				}, 1000, function() {
  					var $target = $(target);
  					$target.focus();
  					if ($target.is(":focus")) {
  						return false;
  					} else {
  						$target.attr('tabindex', '-1');
  						$target.focus();
  					};
  				});
  			}
  		}
  	});

  const logo = $('.logo-wrapper');
  const menu = $('#header .main-menu');
  $('#menu-btn').click( function() {

    if ( $('#menu-btn').hasClass('js-open') ) {
      $(this).removeClass('js-open');
      menu.removeClass('js-open');
      logo.removeClass('js-open');
    } else {
      menu.addClass('js-open');
      logo.addClass('js-open');

      setTimeout(function() {
        $('#menu-btn').addClass('js-open');
      }, 203);
    }
  });

  $('#menu-main-menu a').click( function(e) {
    logo.removeClass('js-open');
    menu.removeClass('js-open');
    $('#menu-btn').removeClass('js-open');
  });



});