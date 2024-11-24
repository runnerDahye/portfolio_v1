(function($) {
  $.fn.timeline = function() {
    var selectors = {
      id: $(this),
      bg : $(this).find(".bg_area"),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      img: ".timeline__back"
    };

    // 첫 번째 항목 활성화 및 배경 설정
    selectors.item.eq(0).addClass(selectors.activeClass);
    selectors.bg.css({
      "background-image": "url(" + selectors.item.first().find(selectors.img).attr("src") + ")",
    });

    // 첫 번째 항목의 data-index로 클래스 추가
    var firstIndex = selectors.item.first().data('index');
    selectors.bg.addClass('timeline-index-' + firstIndex);

    var itemLength = selectors.item.length;

    $(window).scroll(function() {
      var max, min;
      var pos = $(this).scrollTop();

      selectors.item.each(function(i) {
        min = $(this).offset().top;
        max = ($(this).height() + $(this).offset().top);
        var that = $(this);
        var dataIndex = $(this).data('index');

        if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
          // 마지막 항목 활성화
          if (!selectors.item.last().hasClass(selectors.activeClass)) {
            selectors.item.removeClass(selectors.activeClass);
            selectors.bg.css({
              "background-image": "url(" + selectors.item.last().find(selectors.img).attr('src') + ")",
            });
            selectors.item.last().addClass(selectors.activeClass);

            // data-index 기반으로 클래스 추가
            var lastIndex = selectors.item.last().data('index');
            triggerAnimation(selectors.bg, lastIndex);
          }

        } else if (pos <= max - 40 && pos >= min) {
          if (!$(this).hasClass(selectors.activeClass)) {
            // 스크롤 위치에 따른 항목 활성화
            selectors.bg.css({
              "background-image": "url(" + $(this).find(selectors.img).attr('src') + ")",
            });
            selectors.item.removeClass(selectors.activeClass);
            $(this).addClass(selectors.activeClass);

            // data-index 기반으로 클래스 추가
            triggerAnimation(selectors.bg, dataIndex);
          }
        }
      });
    });
  };

  // 클래스 변경 시 애니메이션 재실행 트리거
  function triggerAnimation(element, index) {
    if (!element.hasClass('timeline-index-' + index)) {
      element.removeClass(function(index, className) {
        return (className.match(/(^|\s)timeline-index-\S+/g) || []).join(' ');
      });

      // 애니메이션 재실행을 위해 잠시 클래스 제거 후 다시 추가
      setTimeout(() => {
        element.addClass('timeline-index-' + index);
      }, 10);
    }
  }

})(jQuery);

// 타임라인 초기화
$("#timeline-1").timeline();
