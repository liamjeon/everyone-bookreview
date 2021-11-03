// <script>
//     <link rel="stylesheet" href="../static/css/bestSeller.css"/>
// </script>

$(document).ready(function () {
    show_bestseller();
    check_login();
});

function select_book(clicked_id) {
    $('#modal').toggleClass('is-hidden');

    let curr_Element = document.getElementById(clicked_id);
    let child_Elements = curr_Element.childNodes;

    let title = child_Elements[3].innerHTML;
    let img_url = child_Elements[1]['src'];

    document.getElementById("modal_img_url").src = img_url;
}

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
                                    <p>${title}<span> /저자:${author}</span></p>
                                    <p>${publisher}<span>/${publish_date} 출간</span></p>
                                    
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
        $('.login_yes').removeClass("hidden");
        $('.login_no').addClass("hidden");
    } else {
        $('.login_yes').addClass("hidden");
        $('.login_no').removeClass("hidden");
    }
}