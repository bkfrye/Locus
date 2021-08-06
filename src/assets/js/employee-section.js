document.addEventListener("DOMContentLoaded", () => {

  $('.team-navigation li').click( function() {
    if ( $('.team-navigation li').hasClass('js-active') ) {
      $('.team-navigation li').removeClass('js-active')
    }
    var el = $(this).data('section');
    $(this).addClass('js-active');

    if ( $('.employee-section').hasClass('js-active') ) {
      $('.employee-section').removeClass('js-active');
      $(el).addClass('js-active');
    }
  });


  $('.team-navigation li[data-section="#team"]').click(function() {
    $('.team-carousel').slick({
      dots: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      rows: 2,
      adaptiveHeight: true,
      draggable: false,
      prevArrow: ".prev-arrow",
      nextArrow: ".next-arrow",

      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }
      ]
    });
  })
});