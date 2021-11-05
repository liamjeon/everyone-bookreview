$(document).ready(function () {
    show_bestseller();
    check_login();
});

$('.userbook-close-btn').click(function () {
    $('.modal-hide').toggleClass('opacity-off')
    $('.book-box-bg').toggleClass('opacity-on')
})

function input_bookreview(clicked_id) {
    let title = document.getElementById("modal_title").innerHTML;
}

// function select_book(clicked_id) {
//     // $('#modal').toggleClass('is-hidden');
//
//     let curr_Element = document.getElementById(clicked_id);
//     let child_Elements = curr_Element.childNodes;
//
//     let title = child_Elements[3].innerHTML;
//     let img_url = child_Elements[1]['src'];
//
//     document.getElementById("modal_img_url").src = img_url;
// }

function show_bestseller() {
    $.ajax({
        type: 'GET',
        url: '/insert_bookinfo',
        data: {},
        success: function (response) {
            let bestseller = response['bestseller']
            for (let i = 0; i < bestseller.length; i++) {
                let title = bestseller[i]['title'];
                let author = bestseller[i]['author'];
                let publisher = bestseller[i]['publisher'];
                let publish_date = bestseller[i]['publish_date'];
                let img_url = bestseller[i]['image_url'];

                let temp_html = `<div onclick="select_book(this.id)" id="book${i}" class="book-box">
                                    <img src="${img_url}" >
                                    <p>${title}<p>
                                    <p>${author}</p>
                                    <p>${publisher}</p>
                                    <p>${publish_date}</p>
                                 </div>`;
                $('#books').append(temp_html);
            }
        }
    })
}


//로그인중인지 확인
function check_login() {
    let value = $.cookie('mytoken');

    if (value) {
        $('.login_no').addClass("hidden");
        $('.login_yes').removeClass("hidden");
    } else {
        $('.login_no').removeClass("hidden");
        $('.login_yes').addClass("hidden");
        $('#review_text').addClass("opacity-on");
        $('#send_review').addClass("opacity-on");
    }
}


function select_book(clicked_id) {
    $('#modal').toggleClass('opacity-off')
    $('.book-box-bg').toggleClass('opacity-on')


    let curr_Element = document.getElementById(clicked_id);
    let child_Elements = curr_Element.childNodes;

    let img_url = child_Elements[1]['src'];
    let title = child_Elements[3].innerHTML;
    let author = child_Elements[5].innerHTML;
    let publisher = child_Elements[7].innerHTML;
    let publish_date = child_Elements[9].innerHTML;

    document.getElementById("modal_img_url").src = img_url;
    document.getElementById("modal_title").innerHTML = title;
    document.getElementById("modal_author").innerHTML = author;
    document.getElementById("modal_publisher").innerHTML = publisher;
    document.getElementById("modal_publishdate").innerHTML = publish_date;

    $.ajax({
        type: 'POST',
        url: '/get_reviews',
        data: {
            title_give: title,
        },
        success: function (response) {
            $('#modal-reviews').empty();

            let reviews = response['reviews']
            for (let i = 0; i < reviews.length; i++) {
                let user_id = reviews[i]['user_id'];
                let review = reviews[i]['review'];
                let temp_html = `
                        <div class="modal-review-textbox">
                            <td>${user_id}</td><span>: ${review}</span></td>
                        </div>
                 `;
                $('#modal-reviews').append(temp_html);
            }
        }
    })
}

function modal_close() {
    document.getElementById("modal").style.display = 'none'
}

function send_review() {
    let login_id = document.getElementById("login_id").childNodes[0]['nodeValue'];
    let review_text = document.getElementById("review_text").value;
    let title = document.getElementById("modal_title").innerText;
    document.getElementById("review_text").value = '';

    $.ajax({
        type: 'POST',
        url: '/send_review',
        data: {
            id_give: login_id,
            title_give: title, //책 구별 변수
            review_give: review_text,
        },
        success: function (response) {
            $('#modal-reviews').empty();
            let reviews = response['reviews']

            for (let i = 0; i < reviews.length; i++) {
                let user_id = reviews[i]['user_id'];
                let review = reviews[i]['review'];
                let temp_html = `
                        <div class="modal-review-textbox">
                            <td>${user_id}</td><span>: ${review}</span></td>
                        </div>
                 `;
                $('#modal-reviews').append(temp_html);
            }
        }
    })
}



