"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var resizeTimer;
  var width;
  $(window).on('resize', function (e) {
    $('body').addClass('js-no-transition');
    width = $(window).width();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $('body').removeClass('js-no-transition');
      $('.js-open').removeClass('js-open');
    }, 250);
  }); // Select all links with hashes

  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();

          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          }

          ;
        });
      }
    }
  });
  var logo = $('.logo-wrapper');
  var menu = $('#header .main-menu');
  $('#menu-btn').click(function () {
    if ($('#menu-btn').hasClass('js-open')) {
      $(this).removeClass('js-open');
      menu.removeClass('js-open');
      logo.removeClass('js-open');
    } else {
      menu.addClass('js-open');
      logo.addClass('js-open');
      setTimeout(function () {
        $('#menu-btn').addClass('js-open');
      }, 203);
    }
  });
  $('#menu-main-menu a').click(function (e) {
    logo.removeClass('js-open');
    menu.removeClass('js-open');
    $('#menu-btn').removeClass('js-open');
  }); // update team filter active links

  var teamEl = $('.ats-layout');

  if (teamEl) {
    $('.ats-button').removeClass('ats-button-active');
    $('.filter-item:nth-child(4) .ats-button').addClass('ats-button-active');
    console.log('updated team');
  } // ats-button ats-button-active

});
"use strict";

$('.btn-content').click(function (ev) {
  var URL = $(this).data('url');
  $('#video-player').append("<div class='video-wrapper'><video id='video' class='video-js'></video></div>");
  var player = videojs('video', {
    controls: true,
    autoplay: true,
    preload: 'none',
    fluid: true,
    sources: [URL.toString()]
  });
  player.on('ready', function () {
    $('#video-player').addClass('js-show-video');
    document.querySelector('body').style.overflow = 'hidden';
  });
  player.on('ended', function () {
    closeVideo;
  });

  var closeVideo = function closeVideo() {
    player.dispose();
    $('.video-wrapper').remove();
    $('#video-player').removeClass('js-show-video');
    document.querySelector('body').style.overflow = 'scroll';
  };

  var button = player.addChild('CloseButton');
  button.on('click', closeVideo);
});
//# sourceMappingURL=footer-bundle.js.map
