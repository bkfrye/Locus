"use strict";

var headings = $('.post-inner-content h1, .post-inner-content h2, .post-inner-content h3');
var sideHeadings = $('.documentation nav');
var current = 0;
headings.each(function () {
  current++;
  var titleText = $(this).text();
  var txt2 = $('<a href="#' + current + '"></a>').text(titleText);
  txt2.appendTo(sideHeadings);
  $(this).attr('id', current.toString());
});

if (!headings.length) {
  $('.documentation nav h6').remove();
}

;
"use strict";

(function (exports) {
  exports.githubStars = function (repo, callback) {
    var xmlhttp = new XMLHttpRequest(),
        url = ["https://api.github.com"],
        useCallback = typeof callback == "function"; //count the stars

    function countStars(response) {
      //don't care, just make it an array
      if (!(response instanceof Array)) {
        response = [response];
      } //start the count


      var stars = 0;

      for (var i in response) {
        stars += parseInt(response[i].stargazers_count);
      }

      return stars;
    } //determine if we're looking at a collection or a single repo


    repo = repo.split("/");

    if (repo.length === 1) {
      url.push("users", repo[0], "repos");
    } else {
      url.push("repos", repo[0], repo[1]);
    } //check if we were given a callback, if so we set that up


    if (useCallback) {
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          callback(countStars(JSON.parse(xmlhttp.responseText)));
        }
      };
    }

    xmlhttp.open("GET", url.join("/"), useCallback); //set the github media header

    xmlhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xmlhttp.send();

    if (!useCallback) {
      //no callback, just wait for the response
      return countStars(JSON.parse(xmlhttp.responseText));
    }
  };
})(typeof exports !== 'undefined' ? exports : window);
"use strict";

var girdIsotope = $('.grid');
$(window).on('load', function () {
  if (girdIsotope.length) {
    girdIsotope.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'masonry'
    });
  }
});
"use strict";

// Show the progress bar
NProgress.start(); // Increase randomly

var interval = setInterval(function () {
  NProgress.inc();
}, 1000); // Trigger finish when page fully loaded

$(window).on('load', function () {
  clearInterval(interval);
  NProgress.done();
}); // Trigger bar when exiting the page

window.onbeforeunload = function () {
  console.log("triggered");
  NProgress.start();
};
"use strict";

var header = $('.header');
var mockup = $('#mockup');
var mockupPosition = 100;
mockup.length ? mockupPosition = mockup.position().top + mockup.height() : mockupPosition = 100;
$(window).on('load', function () {
  $(window).scrollTop(0);
  setTimeout(function () {
    header.addClass('reset-delay');
    $('.navigation').addClass('reset-delay');
    $('.logo').addClass('reset-delay');
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= mockupPosition) {
        header.addClass('scrolled');
        sideHeadings.length && sideHeadings.addClass('scrolled');
      } else {
        header.removeClass('scrolled');
        sideHeadings.length && sideHeadings.removeClass('scrolled');
      }
    });
    !mockup.length ? header.addClass('bright') : header.removeClass('brith');
  }, 2000);
  AOS.init();
  $(window).resize(function () {
    AOS.refresh();
  });
  header.addClass('loaded');
});
$(window).resize(function () {
  AOS.refresh;
});
githubStars("luangjokaj/wordpressify", function (stars) {
  $('.github').attr('data-counter', stars);
});
"use strict";

$('a').click(function (event) {
  var scrollOffset = 100;

  if ($(this).is('a[href^="#"]') && $(this).attr('href').length >= 2 && !$(this).hasClass('menu-click')) {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - scrollOffset
    }, 1000);
    return false;
  }

  if ($(this).is('a:not([href^="#"], [href^="mailto"])') && $(this).attr('target') != '_blank') {
    event.preventDefault();
    header.removeClass('loaded', 'bright');
    var newLocation = this.href;
    setTimeout(function () {
      window.location = newLocation;
    }, 1000);
  }
});
//# sourceMappingURL=footer-bundle.js.map
