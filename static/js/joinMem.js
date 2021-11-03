$('#join').click(function () {
        let id = $('#id>input').val();
        let pw = $('#pw>input').val();
        let pw_chk = $('#pw_again>input').val();

        $.ajax({
        type: "GET",
        url: "/signup",
        data: {},
        success: function (response) {
            let bookReview = response['bookReview']
            console.log(bookReview)
            for (let i = 0; i < bookReview.length; i++) {
                let userInput = $('#user_id').val()
                if (userInput === bookReview[i]['id']) {
                    return $('#wrongId').text('- 이미 존재하는 아이디입니다.'), $('#wrongId').css('color', 'red')
                } else if (userInput !== bookReview[i]['id']) {
                    $('#wrongId').text('- 사용 가능한 아이디입니다.')
                    $('#wrongId').css('color', '#fed')
                }
            }
            if ($('#user_id').val() == 0) {
                $('#wrongId').text('- 아이디를 입력해주세요.')
            }
        }
    })

        if (id == 0) {
            return alert('아이디를 입력해주세요.')
        } else if (pw == 0) {
            return alert('비밀번호를 입력해주세요.')
        } else if (pw_chk == 0) {
            return alert('비밀번호 확인을 해주세요.')
        } else {
            $.ajax({
                type: "POST",
                url: "/join_info",
                data: {
                    id_give: id, pw_give: pw
                },
                success: function (response) {
                    alert(response["msg"]);
                    window.location.replace('/login')
                }
            })
        }
    }
)


$('#user_id').keyup(function () {
    $.ajax({
        type: "GET",
        url: "/signup",
        data: {},
        success: function (response) {
            let bookReview = response['bookReview']
            console.log(bookReview)
            for (let i = 0; i < bookReview.length; i++) {
                let userInput = $('#user_id').val()
                if (userInput === bookReview[i]['id']) {
                    return $('#wrongId').text('- 이미 존재하는 아이디입니다.'), $('#wrongId').css('color', 'red')
                } else if (userInput !== bookReview[i]['id']) {
                    $('#wrongId').text('- 사용 가능한 아이디입니다.')
                    $('#wrongId').css('color', '#fed')
                }
            }
            if ($('#user_id').val() == 0) {
                $('#wrongId').text('- 아이디를 입력해주세요.')
            }
        }
    })
})


$('#user_pw_chk').keyup(function () {
    if (($('#user_pw').val() !== $('#user_pw_chk').val())) {
        $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
        $('#wrongPw').css('color', 'red')
    } else if ($('#user_pw').val() === $('#user_pw_chk').val()) {
        $('#wrongPw').text('- 비밀번호가 일치합니다.')
        $('#wrongPw').css('color', '#fed')
    }
    if ($('#user_pw_chk').val() == 0) {
        $('#wrongPw').text('- 비밀번호를 입력해주세요 ')
        $('#wrongPw').css('color', '#fed')
    }
})
