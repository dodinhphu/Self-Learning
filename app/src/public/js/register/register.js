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
                required: "Please enter email",
                email: "Email is wrong format",
            },
            fullname: "Please enter full name",
            address: "Please enter address",
            numberPhone: {
                required: "Please enter number phone",
                rangelength: "Number phone is wrong format",
                number: "Number phone is wrong format",
            },
            type: "Please enter type account",
            password: {
                minlength: "Password Must Be Over 6 Characters",
                required: "Please enter password",
            },
            confirmpassword: {
                required: "Please enter confirm password",
                equalTo: "password incorrect"
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
                .catch(function (er) {

                })
        }
    });
})


var e1 = ` <div>
            <img style="display:block;margin:auto;width:400px;"
                src="https://i.pinimg.com/originals/6d/cd/94/6dcd94c7c4bf4800648ef7cbe0113c33.gif"
                alt="">
            <a style="display: block;margin:auto" href="/authentication/login">
                <button style="display: block;margin:auto" type="button" class="login_dk btn btn-primary">Login now</button>
            </a>
           </div>`;

$('.inpux_dk').focus(function () {
    $('#tb_dk').hide(200);
})