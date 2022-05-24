$('#btn_update').click(function () {
    $("#register_form").validate({
        rules: {
            fullname: "required",
            address: "required",
            numberPhone: {
                required: true,
                rangelength: [10, 10],
                number: true,
            }
        },
        messages: {
            fullname: "Bạn Phải Nhập Họ Và Tên",
            address: "Bạn Phải Nhập Địa Chỉ",
            numberPhone: {
                required: "Bạn Phải Nhập Số Điện Thoại",
                rangelength: "Số Điện Thoại Sai Định Dạng",
                number: "Số Điện Thoại Sai Định Dạng",
            },
        },
        submitHandler: function (form) {
            let fullname = $("#txt_fullname").val();
            let address = $("#txt_address").val();
            let numberPhone = $("#txt_numberphone").val();
            $.ajax({
                url: "/authentication/updateinformation",
                type: "POST",
                data: {
                    fullname: fullname,
                    address: address,
                    numberPhone: numberPhone,
                }
            })
                .then(function (data) {
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-success");
                    $('#tb_dk').text("Cập Nhật Thành Công");
                    $('#tb_dk').show(200);
                    $('form').hide(100);
                    $('#toan_rgt').append(e1);
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
                src="https://sunglasshutusa.com/anh-dong-vui-nhon-hoat-hinh/imager_4937.jpg"
                alt="">
           </div>`;

$('.inpux_dk').focus(function () {
    $('#tb_dk').hide(200);
})