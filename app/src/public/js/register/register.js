$('#btn_register').click(function () {
    $("#register_form").validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            fullname: "required",
            address: "required",
            numberPhone: {
                required: true,
                rangelength: [10, 10],
                number: true,
            },
            type: "required",
            password: {
                minlength: 6,
                required: true,
            },
            confirmpassword: {
                required: true,
                equalTo: "#txt_password"
            },
        },
        messages: {
            email: {
                required: "Bạn Phải Nhập email",
                email: "Email Sai Định Dạng",
            },
            fullname: "Bạn Phải Nhập Họ Và Tên",
            address: "Bạn Phải Nhập Địa Chỉ",
            numberPhone: {
                required: "Bạn Phải Nhập Số Điện Thoại",
                rangelength: "Số Điện Thoại Sai Định Dạng",
                number: "Số Điện Thoại Sai Định Dạng",
            },
            type: "Bạn Phải Chọn Loại",
            password: {
                minlength: "Mật Khẩu Phải Lớn Hơn Hoặc Bằng 67 Ký Tự",
                required: "Bạn Phải Nhập Mật Khẩu",
            },
            confirmpassword: {
                required: "Bạn Phải Nhập Xác Nhận Mật Khẩu",
                equalTo: "Mật Khẩu Không Khớp"
            },
        },
        submitHandler: function (form) {
            let email = $("#txt_email").val();
            let fullname = $("#txt_fullname").val();
            let address = $("#txt_address").val();
            let numberPhone = $("#txt_numberphone").val();
            let type = $("#txt_type").val();
            let password = $("#txt_password").val();
            $.ajax({
                url: "/authentication/register",
                type: "POST",
                data: {
                    email: email,
                    fullname: fullname,
                    address: address,
                    numberPhone: numberPhone,
                    address: address,
                    type: type,
                    password: password,
                }
            })
                .then(function (data) {
                    if (data.status == false) {
                        $('#tb_dk').removeClass();
                        $('#tb_dk').addClass("alert alert-danger");
                        $('#tb_dk').text(data.message);
                        $('#tb_dk').show(200);
                    }
                    else {
                        $('#tb_dk').removeClass();
                        $('#tb_dk').addClass("alert alert-success");
                        $('#tb_dk').text(data.message);
                        $('#tb_dk').show(200);
                        $('form').hide(100);
                        $('#toan_rgt').append(e1);
                    }
                })
                .catch(function (err) {
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-danger");
                    $('#tb_dk').text(err.responseJSON.message);
                    $('#tb_dk').show(200);
                })
        }
    });
})


var e1 = ` <div>
            <img style="display:block;margin:auto;width:400px;"
                src="https://i.pinimg.com/originals/6d/cd/94/6dcd94c7c4bf4800648ef7cbe0113c33.gif"
                alt="">
            <a style="display: block;margin:auto" href="/authentication/login">
                <button style="display: block;margin:auto" type="button" class="login_dk btn btn-primary">Đăng Nhập Ngay</button>
            </a>
           </div>`;

$('.inpux_dk').focus(function () {
    $('#tb_dk').hide(200);
})