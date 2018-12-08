$('.btn-content').click( function(ev) {
  var URL = $(this).data('url');

  $('#video-player').append("<video id='video' class='video-js'></video>")

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
    $('#video-player').removeClass('js-show-video');
    document.querySelector('body').style.overflow = 'scroll';
  };

  var button = player.addChild('CloseButton');
  button.on('click', closeVideo);
});
