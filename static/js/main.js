$(document).ready(function () {
    check_login();
});

$('.review_button').click(function () {
    $('.review').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.review_close').click(function () {
    $('.review').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.userSelect').click(function () {
    $('#modal').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.userbook-close-btn').click(function () {
    $('#modal').toggleClass('opacity-off')
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


//모달창 클릭
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

function select_userbook(clicked_id) {
    document.getElementById("modal").style.display = 'block';

    let curr_Element = document.getElementById(clicked_id);
    let child_Elements = curr_Element.childNodes;
    console.log(curr_Element);
    console.log(child_Elements);

    let title = child_Elements[3].innerHTML;
    let img_url = child_Elements[1]['currentSrc'];

    document.getElementById("modal_img_url").src = img_url;
    document.getElementById("modal_title").innerText = title;

    $.ajax({
        type: "POST",
        url: "/get_user_review",
        data: {
            title_give: title,
        },
        success: function (response) {
            let user_review = response['user_review'];
            let review_title = user_review[0]['reviewTitle'];
            let review_content = user_review[0]['reviewMemo'];
            console.log(user_review)
            console.log(review_title, review_content);

            document.getElementById('review_title').innerText = review_title;
            document.getElementById('review_content').innerText = review_content;
        }
    })


}

