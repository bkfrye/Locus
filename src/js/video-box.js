$('.btn-content').click( function(ev) {
  var URL = $(this).data('url');

  $('#video-player').append("<div class='video-wrapper'><video id='video' class='video-js'></video></div>")

  var player = videojs('video', {
    controls: true,
    autoplay: true,
    preload: 'none',
    fluid: true,
    sources: [URL.toString()],
  });

  player.on('ready', function () {
    $('#video-player').addClass('js-show-video');
    document.querySelector('body').style.overflow = 'hidden';
  });

  player.on('ended', function() {
    closeVideo;
  });

  var closeVideo = function() {
    player.dispose();
    $('.video-wrapper').remove();
    $('#video-player').removeClass('js-show-video');
    document.querySelector('body').style.overflow = 'scroll';
  };

  var button = player.addChild('CloseButton');
  button.on('click', closeVideo);
});
