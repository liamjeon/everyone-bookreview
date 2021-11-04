$(document).ready(function () {
    check_login();
});

$('.review_button').click(function () {
    $('.review').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.review_close').click(function () {
    $('.review').toggleClass('opacity-off');
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.upload_review').click(function () {
    let url = $('#reviewURL').val()
    let reviewMemo = $('#reviewMemo').val()
    let reviewTitle = $('#reviewTitle').val()
    $.ajax({
        type: "POST",
        url: "/viewList",
        data: {url_give: url, reviewMemo_give: reviewMemo, reviewTitle_give: reviewTitle},
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    })
})


$('.userSelect').click(function () {
    $('#userSelect_click').toggleClass('hide-out');
})

$('.select_close').click(function () {
    $('#userSelect_click').removeClass('hide-out');
})


$('.join_mem').click(function () {
    $.removeCookie('mytoken', {path: '/'}); // = > true
})

function check_login() {
    let value = $.cookie('mytoken');

    if (value) {
        $('.login_no').addClass("hidden");
        $('.login_yes').removeClass("hidden");
    } else {
        $('.login_no').removeClass("hidden");
        $('.login_yes').addClass("hidden");
    }
}