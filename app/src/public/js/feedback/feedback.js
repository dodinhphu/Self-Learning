$('#btn_send').click(function () {
    $("#form_feedback").validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            fullname: "required",
            number_phone: {
                required: true,
                rangelength: [10, 10],
                number: true,
            },
            Subject: "required",
            content_feedback:  "required",
        },
        messages: {
            email: {
                required: "Email Không được bỏ trống",
                email: "Email sai định dạng",
            },
            fullname: "Hãy Nhập đầy đủ tên của bạn",
            number_phone: {
                required: "Hãy nhập số điện thoại của bạn",
                rangelength: "Số điện thoại sai định dạng",
                number: "Số điện thoại sai định dạng",
            },
            Subject: "Hãy Nhập Tiêu đề Feed Back",
            content_feedback:  "Hãy Nhập Nội Dung Cho Feed Back",
        },
        submitHandler: function (form) {
            let email = $("#txt_email").val();
            let fullname = $("#txt_fullname").val();
            let number_phone = $("#txt_numberphone").val();
            let Subject = $("#txt_Subject").val();
            let content_feedback = $("#txt_content_feedback").val();
            $.ajax({
                url: "/feedback",
                type: "POST",
                data: {
                    email: email,
                    fullname: fullname,
                    number_phone: number_phone,
                    Subject: Subject,
                    content_feedback: content_feedback,
                }
            })
                .then(function (data) {
                    $('#form_feedback').hide(200);
                    $('#tong_tbaaa').show(200)
                })
                .catch(function (err) {
                    alert(err.responseJSON.message)
                })
        }
    });
})