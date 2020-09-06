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


  // Manage accordion on careers page
  var allPanels = $('.accordion .accordion-content');
  if ( allPanels ) {
    allPanels.hide();
    $('.accordion .clickable').click(function() {
      if ( !$(this).parent().find($('.accordion-content')).is(':visible') ) {
        allPanels.slideUp();
        $(this).parent().find($('.accordion-content')).slideDown();
      } else {
        $(this).parent().find($('.accordion-content')).slideUp();
      }
      return false;
    });
  }


  var pipelines = $('.collapse');

  if ( pipelines ) {
    pipelines.hide();
    $('.graph-row.click').click(function() {
      if ( !$(this).parent().find($('.collapse')).is(':visible') ) {
        pipelines.slideUp();
        $(this).parent().find($('.collapse')).slideDown();
      } else {
        $(this).parent().find($('.collapse')).slideUp();
      }
      return false;
    });
  }


  $('iframe[src*="youtube.com"]').each(function() {
    $(this).wrap('<div class="video-wrapper"/>');
  });

  // Add superscript tag to any relevant symbols
  $('body :not(script)').contents().filter(function() {
    return this.nodeType === 3;
  }).replaceWith(function() {
    return this.nodeValue.replace(/[™®©]/g, '<sup>$&</sup>');
  });


  var badBacteria = $('.st1');
  var index = 0;

  badBacteria.click(function() {
    $('#alive-text').hide();
    $('#kill-text').show();
    $('#bacteria-key').addClass( 'kill-bacteria' );
    var delay = setInterval( function(){
      if ( index <= badBacteria.length ) {
        $( badBacteria[ index ] ).addClass( 'kill-bacteria' );
        // $( badBacteria[ index ] ).fadeTo( 150, 0 )
        index += 1;
      } else {
        clearInterval( delay );
      }
    }, 150 );
  });


  $('.team-navigation li').click( function() {
    if ( $('.team-navigation li').hasClass('js-active') ) {
      $('.team-navigation li').removeClass('js-active')
    }
    var el = $(this).data('section');
    $(this).addClass('js-active');
    console.log(el);

    if ( $('.employee-section').hasClass('js-active') ) {
      $('.employee-section').removeClass('js-active');
      $(el).addClass('js-active');
    }
  })

});