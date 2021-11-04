function is_nickname(asValue) {
    let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,20}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,20}$/;
    return regExp.test(asValue);
}

$('#join').click(function () {
        $.ajax({
            type: "GET",
            url: "/signup",
            data: {},
            success: function (response) {
                let bookReview = response['bookReview']
                let id = $('#id>input').val();
                let pw = $('#pw>input').val();
                let pw_chk = $('#pw_again>input').val();
                let pw_chk_regEx = is_password(pw_chk);
                let id_regEx = is_nickname(id)

                if (id_regEx) {
                    for (let i = 0; i < bookReview.length; i++) {
                        if (id === bookReview[i]['id']) {
                            return alert('이미 존재하는 아이디입니다.'), window.location.replace('/joinMem')
                        }
                    }
                } else {
                    if (id == 0) {
                        return alert('아이디를 입력해주세요.')
                    }
                    return alert('아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-20자 길이'),
                        window.location.replace('/joinMem')
                }
                if (pw == 0) {
                    return alert('비밀번호를 입력해주세요.')
                } else if (pw_chk == 0) {
                    return alert('비밀번호 확인칸을 입력해주세요.')
                } else if (pw != pw_chk) {
                    return alert('비밀번호가 일치하지 않습니다.')
                } else if (!(pw_chk_regEx)) {
                    return alert('비밀번호 형식이 올바르지 않습니다.')
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
        })

    }
)


$('#user_id').keyup(function () {
    $.ajax({
        type: "GET",
        url: "/signup",
        data: {},
        success: function (response) {
            let bookReview = response['bookReview']
            let id = $('#id>input').val();
            let id_regEx = is_nickname(id);
            if (id_regEx) {
                for (let i = 0; i < bookReview.length; i++) {
                    if (id === bookReview[i]['id']) {
                        return $('#wrongId').text('- 이미 존재하는 아이디입니다.'), $('#wrongId').css('color', 'red')
                    } else if (id !== bookReview[i]['id']) {
                        $('#wrongId').text('- 사용 가능한 아이디입니다.')
                        $('#wrongId').css('color', '#fed')
                    }

                }

            } else {
                $('#wrongId').text('- 아이디의 형식을 확인해주세요.'), $('#wrongId').css('color', 'red')
            }
            if ($('#user_id').val() == 0) {
                $('#wrongId').text('- 아이디를 입력해주세요.')
            }
        }
    })
})

$('#user_pw').keyup(function () {
    let pw = $('#pw>input').val();
    let pw_regEx = is_password(pw);
    let pw_chk = $('#pw_again>input').val();


    if (!(pw_regEx)) {
        $('#wrongPw').text('- 비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자')
        $('#wrongPw').css('color', 'red')
    } else if (pw_regEx && (pw_chk == 0)) {
        $('#wrongPw').text('- 비밀번호 확인칸을 입력해주세요')
        $('#wrongPw').css('color', '#fed')
    }
    if (pw_regEx) {
        if ((pw !== pw_chk) && (pw_chk != 0)) {
            $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
            $('#wrongPw').css('color', 'red')
        } else if (pw === pw_chk) {
            $('#wrongPw').text('- 비밀번호가 일치합니다.')
            $('#wrongPw').css('color', '#fed')
        }
    }
    if (pw == 0) {
        $('#wrongPw').text('- 비밀번호를 입력해주세요 ')
        $('#wrongPw').css('color', '#fed')
    }
})


$('#user_pw_chk').keyup(function () {
    let pw = $('#pw>input').val();
    let pw_chk = $('#pw_again>input').val();
    let pw_regEx = is_password(pw);
    let pw_chk_regEx = is_password(pw_chk);

    if (pw_regEx && pw_chk_regEx) {
        if (pw !== pw_chk) {
            $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
            $('#wrongPw').css('color', 'red')
        } else if (pw === pw_chk) {
            $('#wrongPw').text('- 비밀번호가 일치합니다.')
            $('#wrongPw').css('color', '#fed')
        }
    }
    if (!(pw_regEx) && !(pw_chk_regEx) && (pw === pw_chk)) {
        $('#wrongPw').text('- 비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자')
    }
    if (pw_chk == 0) {
        $('#wrongPw').text('- 비밀번호를 입력해주세요 ')
        $('#wrongPw').css('color', '#fed')
    }
    if ((pw !== pw_chk) && (pw_chk != 0)) {
        $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
        $('#wrongPw').css('color', 'red')
    }
})
