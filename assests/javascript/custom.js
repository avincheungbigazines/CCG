$(function () {

    toggleNoticeEvt();

    toggleMenuEvt();

    toggleDropMenuEvt();

    searchFavBoxEvt();

    videoPopUp();

   // InitDatetimePicker();

    Pagination(".page-nav .pagination", 30, 3, 3);

    toggleSubSubMenuEvt();

    shortcutToggle();

    SwiperNews();
});

function SwiperNews(){
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          }
      })
}

function Pagination(selector,totalRecord,pageSize,currentPage) {
    var pageSteps = pageSize;
    var totalSteps = parseInt(totalRecord / pageSteps) + (totalRecord % pageSteps === 0 ? 0 : 1);
    var currentStep = parseInt(currentPage / pageSteps) + (currentPage % pageSteps > 0 ? 1 : 0);
  
    var prevPageTemplate = '<li class="prev-page">' +
        '<a href="javascript:" aria-label="Previous">' +
        '<span class="glyphicon glyphicon-menu-left"></span>' +
        '</a>' +
        '</li>';
    var nextPageTemplate = '<li class="next-page">' +
        '<a href="javascript:" aria-label="Next">' +
        '<span class="glyphicon glyphicon-menu-right"></span>' +
        '</a>' +
        '</li>';
    var prevStepTemplate = '';
    var nextStepTemplate = '<li class="step next-step"><a href="javascript:">...</a></li>';

    var pageTemplate = '<li class="page"><a href="#">{page}</a></li>';

    var init = function () {
        $(selector).html("");
        $(selector).append($(prevPageTemplate).toggleClass("disabled", currentPage === 1));
        $(selector).append($(prevStepTemplate).toggleClass("disabled", currentStep === 1));

        var startPageIndex = (currentStep - 1) * pageSteps + 1;
        var endPageIndex = currentStep * pageSteps;

        for (var i = startPageIndex; i <= endPageIndex; i++) {
            var $page = $(pageTemplate.replace('{page}', i));
            if (i === currentPage) {
                $page.addClass("active");
            }
            $(selector).append($page);
        }
        $(selector).append($(nextStepTemplate).toggleClass("disabled", currentStep === totalSteps));
        $(selector).append($(nextPageTemplate).toggleClass("disabled", currentPage === totalRecord));
    };

    //prev step
    $("body").on("click", selector +' .prev-step', function () {
        if (currentStep > 1) {
            currentStep -= 1;
            init();
        }
    });

    $("body").on("click", selector + ' .next-step', function () {
        if (currentStep < totalSteps) {
            currentStep += 1;
            init();
        }
    });

    init(); 


}


function InitDatetimePicker() {
    $('.datetime-picker-from').datetimepicker({
        useCurrent: false,
        format: 'YYYY-MM-DD',
        pickTime: false,
        maxDate: new Date(),
        widgetPositioning: {
            horizontal: 'right',
            vertical: 'top'
          }
    });
    $('.datetime-picker-to').datetimepicker({
        useCurrent: false,
        format: 'YYYY-MM-DD',
        pickTime: false,
        maxDate: new Date(),
        widgetPositioning: {
            horizontal: 'right',
            vertical: 'bottom'
          }

    });
    $(".datetime-picker-from").on("dp.show", function (e) {
        $('.datetime-picker-to').data("DateTimePicker").hide();
    });
    $(".datetime-picker-to").on("dp.show", function (e) {
        $('.datetime-picker-from').data("DateTimePicker").hide();
    });
}

document.addEventListener("DOMContentLoaded", function(){
    var dotdotdot = function(){
        for (var k = 1; k <= 10; k++) {
            var wrappers = $(".clamp-text-"+k);
            for (var i = 0; i < wrappers.length; i++) {
                let options = {
                    truncate: "letter",
                    watch: "window",
                    tolerance: k
                };
                new Dotdotdot(wrappers[i], options);
            }
        }    
    };
    dotdotdot();
    
    
});

function videoPopUp() {
    var currentVideoItem;
    var opening = false;

    $("body").on("click", ".fotorama-item", function () {
        currentVideoItem = $(this);
        $(this).find(".video-wrp").addClass("open").appendTo("body");
        opening = true;
    });

    $("body").on("click", ".video-wrp .btn-close", function () {      
        if (currentVideoItem) {
            $(this).parents(".video-wrp").find("video")[0].pause();
            $(this).parents(".video-wrp").removeClass("open").appendTo(currentVideoItem);
            currentVideoItem = null;
            opening = false;
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27 && opening) {
            $(".video-wrp .btn-close").click();
        }
    });
}
          
function searchFavBoxEvt() {
    $(".search-fav .btn-search,.search-fav .btn-my-favourite").click(function () {
        $(".search-fav-box").animate({
            right:0
        },400);
    });
    $(".search-fav-box .btn-close").click(function () {

        $(".search-fav-box").animate({
            right: $(window).width()<768 ?'-100%':'-400px'
        }, 400);
    });
}

function toggleDropMenuEvt() {
    if (!isTouchScreen()) {
        var menu_animating = false;
        $(".menu > .drop-menu").hover(function () {
            if (!menu_animating) {
                menu_animating = true;
                $(this).addClass("open");
                $(this).find("> .sub-menu").slideDown(200);
                setTimeout(function () {
                    menu_animating = false;
                }, 200);
            }
        }, function () {
            if (!menu_animating) {
                menu_animating = true;
                $(this).removeClass("open");
                $(this).find("> .sub-menu").slideUp(200);
                setTimeout(function () {
                    menu_animating = false;
                }, 200);
            }
        });
    } else {
        $(".drop-menu > a").click(function () {
           
           $(this).parent().find("> .sub-menu").slideToggle(200);
        });
    }
}

function toggleMenuEvt() {
    $(".toggle-menu").click(function () {
        $(this).toggleClass("open");
        $(".menu").slideToggle(400);
    });
}

function toggleSubSubMenuEvt(){
    if (!isTouchScreen()) {
        $(".menu > li > .sub-menu > ul > li").hover(function(){        
            $(this).parents(".sub-menu").find("ul > li").removeClass("open");
    
            var minHeight = $(this).parent().height();
            $(this).parents(".sub-menu").height(minHeight);
    
            $(this).addClass("open");
            var menuHeight = $(this).find(".sub-menu").height();
            
            if(menuHeight>minHeight){
                $(this).parents(".sub-menu").height(menuHeight);
            }
        },function(){
            
        });
    }    
}

function toggleNoticeEvt() {
    $(".toggle-notice").click(function () {
        $(this).toggleClass("open");
        $(".notice-wrp").toggleClass("open").slideToggle(400);
    });
}

function isTouchScreen() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

function shortcutToggle(){
    $(".shortcut-toggle").click(function(){
        $(this).toggleClass("opened");
        $(this).toggleClass("closed");

        $(".shortcuts .toggle-item").slideToggle();
    });
}
