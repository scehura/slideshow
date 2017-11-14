/**
  * SlideShow
  * @param {Object} options - user config
  */
function SlideShow(options) {

  // Check whether SlideShow is a constructor
  if(!(this instanceof SlideShow)) {
    return new SlideShow(options);
  }

  var config = userConfig(options);
  var slideIndex = 0;
  var perPage = config.perPage;

  var slideShow = document.querySelector(config.selector);
  var slide = slideShow.children;
  var slides = [];

  changeNumberSlides();

  // Get slides
  for(var s = 0; s < slide.length; s++) {
    slides.push(slide[s]);
  }

  slideShow.style.overflow = 'hidden';

  // Create slideTrack
  var slideTrack = document.createElement('div');
  slideTrack.style.width = slideTrackSize(slideShow.offsetWidth);
  slideTrack.style.transition = 'all .5s ease-in-out';
  slideShow.appendChild(slideTrack);

  // Set slides style
  for(var i = 0; i < slides.length; i++) {
    slides[i].style.width = (100 / slides.length) + '%';
    slides[i].style.float = 'left';
    slideTrack.appendChild(slides[i]);
  }

  window.addEventListener('resize', function() {
    changeNumberSlides();
    slideTrack.style.width = slideTrackSize(slideShow.offsetWidth);
  });


  /**
    * Setting user config
    */
  function userConfig(options) {
    // default config
    var config = {
      selector: '.slideshow',
      perPage: 1
    };

    // Apply user config
    for(var option in options) {
      if(config.hasOwnProperty(option)) {
        config[option] = options[option];
      }
    }
    return config;
  }


  function changeNumberSlides() {
    if(typeof config.prePage === 'number') {
      perPage = config.perPage;
    } else if(typeof config.perPage === 'object') {
      for(var viewport in config.perPage) {
        if(window.innerWidth >= viewport) {
          perPage = config.perPage[viewport];
        }
      }
    }
  }


  /**
    * Calculate width of slideTrack
    */
  function slideTrackSize(width) {
    return ((width / perPage) * slides.length) + 'px';
  }


  function slidesMove() {
    return slideTrack.style.transform = 'translate3d(-'+ (slideIndex * slides[0].offsetWidth) +'px, 0, 0)';
  }


  // Next slide
  function next() {
    if(slideIndex >= (slides.length - perPage)) return;
    slideIndex++;
    slidesMove();
  }

  
  // Prev slide
  function prev() {
    if(slideIndex === 0) return;
    slideIndex--;
    slidesMove();
  }

  return { next: next, prev: prev };

}
