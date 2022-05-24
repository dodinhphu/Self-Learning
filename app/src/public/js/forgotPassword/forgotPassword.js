$('#changepass').click(function () {
    $("#toankhung").validate({
        rules: {
            password: {
                minlength: 6,
                required: true,
            },
            confirmpassword: {
                required: true,
                equalTo: "#newpassword"
            },
        },
        messages: {
            password: {
                minlength: "Mật Khẩu Phải Lớn Hơn Hoăc Bằng 6 Ký Tự",
                required: "Bạn Phải Nhập Mật Khẩu",
            },
            confirmpassword: {
                required: "Bạn Phải Nhập Xác Nhận Mật Khẩu",
                equalTo: "Mật Khẩu Không Trùng Khớp"
            },
        },
        submitHandler: function (form) {
            $.ajax({
                url: `/authentication/changepassword`,
                method: 'POST',
                data: {
                    token: window.location.search,
                    password: $('#newpassword').val(),
                }
            })
                .then(function (data) {
                    $('#toankhung').hide(200);
                    $('#tong_tren').append('<div class= "alert alert-success" role = "alert">Thay Đỗi Mật Khẩu Thành Công</div>')
                })
                .catch(function (err) {
                    $('#tb_tong_rsmk').text(JSON.parse(err.responseText).message);
                    $('#tb_tong_rsmk').show(200);
                })
        }
    });
})
function an() {
    $('#tb_checknewp').hide(200);
    $('#tb_newpw').hide(200);
    $('#tb_tong_rsmk').hide(200);
}