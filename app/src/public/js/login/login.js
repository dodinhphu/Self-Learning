
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