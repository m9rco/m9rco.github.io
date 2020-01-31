(function ($) {
  // Search ------------
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size() && !isMobile.any()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  // Share ------------
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }
    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // fancybox
  if ($.fancybox) {
    $('[data-fancybox]').fancybox({
      protect: true
    });
  }

  // lazyload
  $(".lazy").lazyload();

  $(document).ready(function ($) {
    $(".anchor").click(function (event) {
      event.preventDefault();
      $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
    });
  });

  // Mobile nav
  var $content = $('.content'),
    $sidebar = $('.sidebar'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('.navbar-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
    stopMobileNavAnim();
  });

  $($content).on('click', function () {
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

  var timer;
  var _network = [
    '我可以拒绝自由，因为这是我的自由',
    '学会习惯一个人，不要总是要人一起',
    '要多学点知识，将来的日子需要你好好过，还有你的父母将来要依靠你',
    '不要以貌取人，外貌并不重要，重要的是人品与气质',
    '不要总是懦弱，要学会应对与解决困境',
    '每周打一个电话回家，问候一下家人，家人是世界上永远都不会抛弃你的人，永远包容你的人',
    '对每个人不要轻易地发脾气，不然很多人都会烦你',
    '要懂得感恩，对每个对自己好的人要怀着感恩的心，认真对待他们',
    '机会是留给有准备的人，不要总是等待，不做好准备',
    '要慢慢地胆大，学会在公众面前讲话',
    '要学会独立，不要事事想着依赖家人',
    '作为一个人，多读一点书，增加自己的涵养与知识',
    '今日事，今日做，不要像以前一样拖拉做事要果断，不要犹豫不决',
    '要学会节约，要知道金钱来之不易，不要浪费',
    '要对自己该做的事情负责任，不要推脱，努力做好',
    '要尽自己最大的力量帮助别人，因为你也曾受到别人的帮助',
    '要珍惜时间与机会，错过就不会回来',
    '如果讨厌一个人，不要挂在嘴边，自会让自己更心烦而已',
    '不要与别人攀比，体谅父母，不要增加家庭负担',
    '要坚持心中的梦想，要有目标的生活喜欢做一件事，就要坚持下去',
    '不要轻言放弃，要自信，告诉自己就是最好的',
    '不要经常上网，不要经常看小说，不要经常熬夜，这些都对身体不太好',
    '要虚心接受别人的批评，要敢于承认自己的错误',
    '要学会合作，不要单打独斗，与朋友搞好关系学习更多做人做事的经验'
  ];

  $('.rand-words').hover(function(){
    clearInterval(timer); 
  }, function(){ 
    timer = setInterval(function(){
      $(".rand-words").fadeOut("slow",function(){
        $(this).text(_network[Math.floor((Math.random()*_network.length))]);
        $(this).fadeIn('slow');
      });
    }, 8000) ;
  }).trigger('mouseleave'); 

})(jQuery);
