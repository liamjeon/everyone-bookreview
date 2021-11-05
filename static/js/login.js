$('#login').click(function () {
    let id = $('#id>input').val();
    let pw = $('#pw>input').val();

    $.ajax({
        type: "POST",
        url: "/logins",
        data: {
            id_give: id, pw_give: pw
        },
        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token']);
                window.location.replace('/');
            } else {
                swal({
                    text: '아이디 비밀번호를 정확히 입력해주세요.',
                    icon: "error",
                })
            }
        }
    })
})
/**/