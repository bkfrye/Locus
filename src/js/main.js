document.addEventListener("DOMContentLoaded", () => {

  var resizeTimer;

  var width;

  $(window).on('resize', function(e) {
    $('body').addClass('js-no-transition');
    width = $(window).width();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      $('body').removeClass('js-no-transition');

      $('.js-open').removeClass('js-open');
    }, 250);

  });


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



  // update team filter active links
  var teamEl = $('.ats-layout');

  if (teamEl) {
    $('.ats-button').removeClass('ats-button-active');
    $('.filter-item:nth-child(4) .ats-button').click();
  }



  // Manage accordion on careers page
  var allPanels = $('.accordion .accordion-content').hide();
  $('.accordion .clickable').click(function() {
    if ( !$(this).parent().find($('.accordion-content')).is(':visible') ) {
      allPanels.slideUp();
      $(this).parent().find($('.accordion-content')).slideDown();
    }
    return false;
  });


  // animate elements in on scroll
  let fadeArray = [];
  var fadeIn = $('.sr .fade-in');
  fadeArray = fadeIn;

  fadeArray.each(function() {
    ScrollReveal().reveal($(this), {
      reset: true,
      delay: 250,
    });
  })

});