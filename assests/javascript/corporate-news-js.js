$(function () {
    toggleSidebarFilterEvt();
});


function toggleSidebarFilterEvt() {
    $(".filter-switcher").click(function () {
        $(".filter-switcher").show();
        $(this).hide();
        if ($(this).hasClass("open-filter")) {
            $(".filters").slideDown();
        } else {
            $(".filters").slideUp();
        }
        
    });
}

