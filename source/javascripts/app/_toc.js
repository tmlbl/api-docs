//= require ../lib/_jquery
//= require ../lib/_imagesloaded.min

function _trace(msg) { 
  console.log(msg)
}

var doTrace = true;

_trace("* Loading " + window.location);
;(function () {
  'use strict';

  var loaded = false;

  var debounce = function(func, waitTime) {
    var timeout = false;
    return function() {
      if (timeout === false) {
        setTimeout(function() {
          func();
          timeout = false;
        }, waitTime);
        timeout = true;
      }
    };
  };

  var closeToc = function() {
    $(".toc-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };


  // Scroll down to account for nav bar - Only if current anchor is at the very top
  function offsetAnchor() {
    _trace("In offsetAnchor");
    if (location.hash.length !== 0) {
      var elt = $(location.hash);
      if (Math.abs(elt.offset().top - $(window).scrollTop()) < 1)
         window.scrollTo(window.scrollX, window.scrollY - 60);
    }
  }
  
  function loadToc($toc, tocLinkSelector, tocListSelector, scrollOffset) {
    _trace("In loadTOC");
    var headerHeights = {};
    var pageHeight = 0;
    var windowHeight = 0;
    var originalTitle = document.title;

    var recacheHeights = function() {
      _trace("In recacheHeights");
      headerHeights = {};
      pageHeight = $(document).height();
      windowHeight = $(window).height();

      $toc.find(tocLinkSelector).each(function() {
        var targetId = $(this).attr('href');
        if (targetId[0] === "#") {
          headerHeights[targetId] = $(targetId).offset().top;
        }
      });
    };

    var refreshToc = function() {
      _trace("In refreshToc");
      var currentTop = $(document).scrollTop() + scrollOffset;

      if (currentTop + windowHeight >= pageHeight) {
        // at bottom of page, so just select last header by making currentTop very large
        // this fixes the problem where the last header won't ever show as active if its content
        // is shorter than the window height
        currentTop = pageHeight + 1000;
      }

      var best = null;
 
      for (var name in headerHeights) {
        if ((headerHeights[name] < currentTop && headerHeights[name] > headerHeights[best]) || best === null) {
          best = name;
        }
      }
      _trace("Found best = " + best);

      // Catch the initial load case
      if (currentTop == scrollOffset && !loaded) {
        best = window.location.hash;
        _trace("Reset best = " + best + " " + currentTop + " " + scrollOffset);
      }

      var $best = $toc.find("[href='" + best + "']").first();
      if (!$best.hasClass("active")) {
        // .active is applied to the ToC link we're currently on, and its parent <ul>s selected by tocListSelector
        // .active-expanded is applied to the ToC links that are parents of this one
        $toc.find(".active").removeClass("active");
        $toc.find(".active-parent").removeClass("active-parent");
        $best.addClass("active");
        $best.parents(tocListSelector).addClass("active").siblings(tocLinkSelector).addClass('active-parent');
        $best.siblings(tocListSelector).addClass("active");
        $toc.find(tocListSelector).filter(":not(.active)").slideUp(150);
        $toc.find(tocListSelector).filter(".active").slideDown(150);
        if (window.history.pushState && loaded) {
          if (currentTop > scrollOffset + 10 ) {
            _trace("Pushing state: " + best);
            window.history.pushState(null, "", best);
          } else {
            _trace("Pushing state: " + window.location.pathname + window.location.search);
            window.history.pushState(null, "", window.location.pathname + window.location.search);
          }
        }
        // TODO remove classnames
        document.title = $best.data("title") + " – " + originalTitle;
      }
      loaded = true;
      offsetAnchor();
    };

    var makeToc = function() {
      recacheHeights();
      refreshToc();

      $("#nav-button").click(function() {
        $(".toc-wrapper").toggleClass('open');
        $("#nav-button").toggleClass('open');
        return false;
      });
      $(".page-wrapper").click(closeToc);
      $(".toc-link").click(closeToc);

      // reload immediately after scrolling on toc click
      $toc.find(tocLinkSelector).click(function() {
        _trace("* Following TOC link");
        setTimeout(function() {
           refreshToc();
        }, 0);
      });

      $(window).scroll(debounce(refreshToc, 150));
      $(window).resize(debounce(recacheHeights, 150));
    };

    makeToc();

    window.recacheHeights = recacheHeights;
    window.refreshToc = refreshToc;
  }

  window.loadToc = loadToc;
})();
