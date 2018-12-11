function loadInlineVideos(el, i) {
  var URL = el.closest('.inline-video').data('url');
  var poster = el.closest('.inline-video').data('poster');
  var id = el.attr('id');

  console.log(id);


  // el.append("<video id='inline-video' class='video-js'></video>")

  var player = videojs(id, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: true,
    sources: [URL.toString()],
    poster: poster,
  });

  player.removeChild('BigPlayButton');
}

var inlineVid = $('.video-js');
console.log(inlineVid);
inlineVid.each(function(){
  loadInlineVideos($(this));
});

