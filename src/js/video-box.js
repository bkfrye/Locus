
/**
 * Custom YouTube Video Functionality
 *
 * @package WordPress
 * @subpackage Carlyle
 * @since Carlyle 0.0.1
 */

function YouTubeGetID(url){
 url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
 return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}


// Load and play video on click
$( '.btn-content' ).click( function() {
  var videoURL = YouTubeGetID( $(this).data( 'url' ) );
  var iframe = document.createElement( 'iframe' );

  iframe.setAttribute( 'frameborder', '0' );
  iframe.setAttribute( 'allowfullscreen', '' );
  iframe.setAttribute( 'height', '100%' );
  iframe.setAttribute( 'width', '100%' );
  iframe.setAttribute( 'src', 'https://www.youtube.com/embed/'
    + videoURL
    + '?rel=0&modestbranding=1&autoplay=1&controls=1&rel=0'
  );

  $('#player').append( iframe );
  $('#player-wrapper').addClass('js-show-video');
  $('body').css({'overflow' : 'hidden'});
} );

// Close video box
$('#close-video').click( function() {
  $('#player-wrapper').removeClass('js-show-video');
  $('body').css({'overflow' : 'inherit'});
  $('#player iframe').remove();
} );
