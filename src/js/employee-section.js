document.addEventListener("DOMContentLoaded", () => {

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
  });

  $('.employee-item').click(function() {
    var id = $(this).data('id');
    var type = $(this).data('type');
    var data = {
      'action': 'load_posts_by_ajax',
      'id': id,
      'type': type,
      'security': employee.security,
    };

    $.post(employee.ajaxurl, data, function(response) {
      if($.trim(response) != '') {
        $('#bio-view-content').append(response);
      }
    });
    $('#bio-view').addClass('js-open');
    $('body').addClass('js-open');
    $('#overlay').addClass('js-open');
  });

  $('#close-panel').click(function() {
    console.log('testing button')
    $('#bio-view').removeClass('js-open');
    $('body').removeClass('js-open');
    $('#bio-view-content').empty();
    $('#overlay').removeClass('js-open');
  });

  $('#overlay').click(function(e) {
    $('#bio-view').removeClass('js-open');
    $('body').removeClass('js-open');
    $('#bio-view-content').empty();
    $('#overlay').removeClass('js-open');
  });



});