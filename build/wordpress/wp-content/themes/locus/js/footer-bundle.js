"use strict";

/*
*  new_map
*/
function new_map($el) {
  var $markers = $el.find('.marker');
  var args = {
    zoom: 16,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }; // create map

  var map = new google.maps.Map($el[0], args); // add a markers reference

  map.markers = []; // add markers

  $markers.each(function () {
    add_marker($(this), map);
  });
  center_map(map);
  return map;
}
/*
*  add_marker
*/


function add_marker($marker, map) {
  // var
  var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng')); // create marker

  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  }); // add to array

  map.markers.push(marker); // if marker contains HTML, add it to an infoWindow

  if ($marker.html()) {
    // create info window
    var infowindow = new google.maps.InfoWindow({
      content: $marker.html()
    }); // show info window when marker is clicked

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }
}
/*
*  center_map
*
*/


function center_map(map) {
  // vars
  var bounds = new google.maps.LatLngBounds(); // loop through all markers and create bounds

  $.each(map.markers, function (i, marker) {
    var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
    bounds.extend(latlng);
  }); // only 1 marker?

  if (map.markers.length == 1) {
    // set center of map
    map.setCenter(bounds.getCenter());
    map.setZoom(16);
  } else {
    map.fitBounds(bounds);
  }
} // global var


var map = null;
$(document).ready(function () {
  $('.acf-map').each(function () {
    // create map
    map = new_map($(this));
  });
});
"use strict";

/**
 * Custom YouTube Video Functionality
 *
 * @package WordPress
 * @subpackage Carlyle
 * @since Carlyle 0.0.1
 */
function YouTubeGetID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

var videos = $('.inline-video');
videos.each(function () {
  var id = YouTubeGetID($(this).data('url'));
  var poster = 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg';
  $(this).css({
    'background-image': 'url(' + poster + ')'
  });
});
$('.inline-video').click(function () {
  var videoID = YouTubeGetID($(this).data('url'));
  var iframe = document.createElement('iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoID + '?rel=0&modestbranding=1&autoplay=1&controls=1&rel=0');
  $(this).append(iframe);
});
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
    $('.filter-item:nth-child(4) .ats-button').click();
  } // Manage accordion on careers page


  var allPanels = $('.accordion .accordion-content');

  if (allPanels) {
    allPanels.hide();
    $('.accordion .clickable').click(function () {
      if (!$(this).parent().find($('.accordion-content')).is(':visible')) {
        allPanels.slideUp();
        $(this).parent().find($('.accordion-content')).slideDown();
      } else {
        $(this).parent().find($('.accordion-content')).slideUp();
      }

      return false;
    });
  } // animate elements in on scroll


  var fadeArray = [];
  var fadeIn = $('.sr .fade-in');
  fadeArray = fadeIn;
  fadeArray.each(function () {
    ScrollReveal().reveal($(this), {
      reset: false,
      delay: 250
    });
  });
  $('iframe[src*="youtube.com"]').each(function () {
    $(this).wrap('<div class="video-wrapper"/>');
  }); // Add superscript tag to any relevant symbols

  $('body :not(script)').contents().filter(function () {
    return this.nodeType === 3;
  }).replaceWith(function () {
    return this.nodeValue.replace(/[™®©]/g, '<sup>$&</sup>');
  }); // $grid.isotope({ filter: '.metal' });

  setTimeout(function () {
    $('#team-wrapper .filter-item:eq(3) .ats-button').click();
  }, 1000);
  var badBacteria = $('.st1');
  var index = 0;
  badBacteria.click(function () {
    $('#alive-text').hide();
    $('#kill-text').show();
    $('#bacteria-key').addClass('kill-bacteria');
    var delay = setInterval(function () {
      if (index <= badBacteria.length) {
        $(badBacteria[index]).addClass('kill-bacteria'); // $( badBacteria[ index ] ).fadeTo( 150, 0 )

        index += 1;
      } else {
        clearInterval(delay);
      }
    }, 150);
  });
});
"use strict";

/**
 * Custom YouTube Video Functionality
 *
 * @package WordPress
 * @subpackage Carlyle
 * @since Carlyle 0.0.1
 */
function YouTubeGetID(url) {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
} // Load and play video on click


$('.btn-content').click(function () {
  var videoURL = YouTubeGetID($(this).data('url'));
  var iframe = document.createElement('iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoURL + '?rel=0&modestbranding=1&autoplay=1&controls=1&rel=0');
  $('#player').append(iframe);
  $('#player-wrapper').addClass('js-show-video');
  $('body').css({
    'overflow': 'hidden'
  });
}); // Close video box

$('#close-video').click(function () {
  $('#player-wrapper').removeClass('js-show-video');
  $('body').css({
    'overflow': 'inherit'
  });
  $('#player iframe').remove();
});
//# sourceMappingURL=footer-bundle.js.map
