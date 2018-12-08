"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Select all links with hashes
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
  });
});
"use strict";

$('.btn-content').click(function (ev) {
  var URL = $(this).data('url');
  $('#video-player').append("<video id='video' class='video-js'></video>");
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
    $('#video-player').removeClass('js-show-video');
    document.querySelector('body').style.overflow = 'scroll';
  };

  var button = player.addChild('CloseButton');
  button.on('click', closeVideo);
});
//# sourceMappingURL=footer-bundle.js.map
