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
  
  
  $('.menu-item-has-children').click( function(e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('.menu-item-has-children').hasClass('js-active')) { 
      $('.menu-item-has-children').removeClass('js-active') 
    }
    $(this).addClass('js-active');
  });

  $('.sub-menu .menu-item').click( function(e) {
    e.stopPropagation();
  });

  $(document).on('click', function (e) {
    if ($('.menu-item-has-children').hasClass('js-active')) { 
      $('.menu-item-has-children').removeClass('js-active') 
    }
  });

  // convert hash (false) links to div element
  var $convertLinks = $("a[href='#']");
  $convertLinks.each( function () {
    this.replaceWith("<div class='false-link'>" + this.innerHTML + '</div>')
  });


  $('iframe[src*="youtube.com"]').each(function() {
    $(this).wrap('<div class="video-wrapper"/>');
  });

  const logo = $('.logo-wrapper');
  const menu = $('#header .main-menu');
  const header = $('#header');
  $('#menu-btn').click( function() {

    if ( $('#menu-btn').hasClass('js-open') ) {
      $('body').css({'overflow' : 'inherit'});
      $(this).removeClass('js-open');
      menu.removeClass('js-open');
      logo.removeClass('js-open');
      header.removeClass('js-open');
    } else {
      $('body').css({'overflow' : 'hidden'});
      menu.addClass('js-open');
      logo.addClass('js-open');
      header.addClass('js-open');

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


  // controls global news banner open/close state
  $('.close-news-banner').click( () => {
    $('.global-news-banner').css('display', 'none');
    localStorage.setItem('bannerClosed', true);
  });

  if (!localStorage.getItem('bannerClosed')) {
    $('.global-news-banner').css('display', 'block');
  } else {
    $('.global-news-banner').css('display', 'none');
  }

  if ( $('#lottie-wrapper').length > 0 ) {
    // console.log('test')
    LottieInteractivity.create({
      mode: 'scroll',
      player: '#lottie-anim',
      container: "#lottie-wrapper",
      actions: [
        {
          visibility: [0, 0.3],
          type: 'stop',
        },
        {
          visibility: [0.3, 1],
          type: 'play',
        }
      ]
    });
  }

  // open and close contact form 
  $( '#contact-form' ).click( function(e) {
    $('#contact-form-wrapper').addClass('js-show-form');
    $('body').css({'overflow' : 'hidden'});
  } );

  // Close video box
  $('#close-form').click( function() {
    $('#contact-form-wrapper').removeClass('js-show-form');
    $('body').css({'overflow' : 'inherit'});
  } );

  

});