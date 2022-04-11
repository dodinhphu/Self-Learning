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
                minlength: "Password Must Be Over 6 Characters",
                required: "Please enter password",
            },
            confirmpassword: {
                required: "Please enter confirm password",
                equalTo: "password incorrect"
            },
        },
        submitHandler: function (form) {
            $.ajax({
                url: `/authentication/updatepassword`,
                method: 'POST',
                data: {
                    password: $('#newpassword').val(),
                }
            })
                .then(function (data) {
                    $('#toankhung').hide(200);
                    $('#tong_tren').append('<div class= "alert alert-success" role = "alert">Change Password successfully</div>')
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