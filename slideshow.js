/**
  * SLideShow
  * @param {Object} options - user config
  */
var SlideShow = function(options) {

  // Check whether SlideShow is a constructor
  if(!(this instanceof SlideShow)) {
    return new SlideShow(options);
  }

  var config = userConfig(options);
  var slideIndex = 0;
  var perPage = config.perPage;

  var slideShow = document.querySelector(config.selector);
  var slide = slideShow.querySelectorAll('div');
  var slides = slide.length;

  changeNumberSlides();

  slideShow.style.overflow = 'hidden';

  // Create slidetrack
  var slideTrack = document.createElement('div');
  slideTrack.style.width = slideTrackSize(slideShow.offsetWidth);
  slideTrack.style.transition = 'all .5s ease-in-out';
  slideShow.appendChild(slideTrack);

  // Set slides style
  for(var i = 0; i < slides; i++) {
    slide[i].style.width = (100 / slides) + '%';
    slide[i].style.float = 'left';
    slideTrack.appendChild(slide[i]);
  }

  window.addEventListener('resize', function() {
    changeNumberSlides();
    slideTrack.style.width = slideTrackSize(slideShow.offsetWidth);
  });

  // Set user config
  function userConfig(options) {
    // Default config
    var config = {
      selector: '.slideshow',
      perPage: 1
    }

    // Apply user config
    for(var attr in options) {
      if(config.hasOwnProperty(attr)) {
        config[attr] = options[attr];
      }
    }

    return config;
  }

  function changeNumberSlides() {
    if(typeof config.prePage === 'number') {
      perPage = this.config.perPage;
    } else if(typeof config.perPage === 'object') {
      for(var viewport in config.perPage) {
        if(window.innerWidth >= viewport) {
          perPage = config.perPage[viewport];
        }
      }
    }
  }

  function slideTrackSize(width) {
    return ((width / perPage) * slides) + 'px';
  }

  function slidesMove() {
    return slideTrack.style.transform = 'translate3d(-'+ (slideIndex * slide[0].offsetWidth) +'px, 0, 0)';
  }

  this.next = function() {
    if(slideIndex >= (slides - perPage)) return;
    slideIndex++;
    slidesMove();
  }

  this.prev = function() {
    if(slideIndex === 0) return;
    slideIndex--;
    slidesMove();
  }

}
