/*scrolling banner*/
(function ($) {
  "use strict";
  $(document).ready(function () {
    $('#owl-carousel-container-work').owlCarousel({
      items: 3,
      nav: true,
      loop: true,
      autoplay: true,
      autoPlaySpeed: 5000,
      autoplayHoverPause: true,
      mouseDrag: true,
      responsiveClass: true,
      /*navText : ["<i class='fas fa-long-arrow-alt-left'></i>","<i class='fas fa-long-arrow-alt-right'></i>"],*/
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 1
        },
        767: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        }
      },
      onDrag: _ => { 
        $('[data-bs-toggle="tooltip"]').tooltip('hide');
      }
    });
  });
})(jQuery); 

(function ($) {
  "use strict";
  $(document).ready(function () {
    $('#owl-carousel-container-posts').owlCarousel({
      items: 1,
      nav: true,
      loop: true,
      autoplay: true,
      autoPlaySpeed: 10000,
      autoplayHoverPause: true,
      mouseDrag: true,
      responsiveClass: true,
      /*navText : ["<i class='fas fa-long-arrow-alt-left'></i>","<i class='fas fa-long-arrow-alt-right'></i>"],*/
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 1
        },
        767: {
          items: 1
        },
        992: {
          items: 1
        },
        1200: {
          items: 1
        }
      },
      onDrag: _ => { 
        $('[data-bs-toggle="tooltip"]').tooltip('hide');
      }
    });
  });
})(jQuery); 

