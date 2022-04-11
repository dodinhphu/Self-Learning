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
            fullname: "Please enter full name",
            address: "Please enter address",
            numberPhone: {
                required: "Please enter number phone",
                rangelength: "Number phone is wrong format",
                number: "Number phone is wrong format",
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
                    $('#tb_dk').text("Updated Successfully");
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