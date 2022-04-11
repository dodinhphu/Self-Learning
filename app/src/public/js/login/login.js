
function login() {
    $.ajax({
        url: document.location.pathname + document.location.search,
        type: "POST",
        data: {
            email: $('#txt_email').val().toString(),
            password: $('#txt_password').val().toString()
        },
    }).then(function (data) {
        if (data.status == true) {
            let checkbox = document.getElementById('customCheck1');
            if (checkbox.checked) {
                setCookie('token', data.token_key, 14);
            }
            else {
                setCookie('token', data.token_key);
            }

            if (data.prevlink) {
                window.location = data.prevlink;
            }
            else {
                window.location = `/home`;
            }
        }
        else {
            $('#tb_tb_lg').text(data.message);
            $('#tb_tb_lg').show(200);
        }
    })
        .catch(err => {
            $('#tb_tb_lg').text(err);
            $('#tb_tb_lg').show(200);
        })
}
$('.ip-login').focus(function () {
    $('#tb_tb_lg').hide(200);
})

/* quên mật khẩu */
function quen_mk() {
    $('#noidungmodule').css('background-color', '#ccc');
    $('#noidungmodule').append('<div id="loader" class="loader"></div>')
    $('#email_quen').attr('readonly', true);
    $('#email_quen').css('cursor', "not-allowed");
    $.ajax({
        url: '/authentication/resetpassword',
        type: "POST",
        data: {
            email: $('#email_quen').val().toString(),
        },
    })
        .then(function (data) {
            $('#loader').remove();
            $('#email_quen').attr('readonly', false);
            $('#email_quen').css('cursor', "text");
            $('#noidungmodule').css('background-color', '#fff');
            $('#txt_tbqmk_true').text(`Please check your emails ${data.accepted[0]}`);
            $('#email_quen').val('');
            $('#email_quen').hide();
            $('#btn_qmk_ctn').hide();
            $('#qmk_true').show(200);
        })
        .catch(function (err) {
            $('#loader').remove();
            $('#email_quen').attr('readonly', false);
            $('#email_quen').css('cursor', "text");
            $('#noidungmodule').css('background-color', '#fff');
            $('#txt_tbqmk_false').text(JSON.parse(err.responseText).message);
            $('#qmk_false').show(200);
        })
}

function an_qmk() {
    $('#email_quen').val('');
    $('#qmk_false').hide(200);
    $('#qmk_true').hide(200);
}
function hien_qmk() {
    $('#email_quen').show();
    $('#btn_qmk_ctn').show();
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}