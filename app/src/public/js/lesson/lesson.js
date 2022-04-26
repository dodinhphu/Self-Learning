$('#btn_create').click(function () {
    $("#register_form").validate({
        rules: {
            lesson_name: {
                required: true,
            },
            lesson_STT: {
                required: true,
                number: true,
                min: 1
            },
            lesson_video: "required",
        },
        messages: {
            lesson_name: {
                required: "Không Được Bỏ Trống Tên Bài Học",
            },
            lesson_STT: {
                required: "Không Được Bỏ Trống Số Thứ Tự",
                number: "Sai Định Dạng",
                min: "Giá Nhỏ nhất Là 1"
            },
            lesson_video: "Hãy Nhập Link Video",
        },
        submitHandler: function (form) {
            $.ajax({
                url: location.href,
                type: "POST",
                data: {
                    lesson_name: $('#lesson_name').val(),
                    lesson_video: $('#lesson_video').val(),
                    lesson_STT: $('#lesson_STT').val(),
                },
            })
                .then(function (data) {
                    $('#register_form').hide(100)
                    $('#tb_dk_tc').text(data.message);
                    $('.tong_ttba').show(200);
                })
                .catch(function (err) {
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-danger");
                    $('#tb_dk').text(err.responseJSON.message);
                    $('#tb_dk').show(200);
                    $('#btn_create').hide(200);
                })

        }
    });
})

$('#btn_update').click(function () {
    $("#register_form").validate({
        rules: {
            lesson_name: {
                required: true,
            },
            lesson_STT: {
                required: true,
                number: true,
                min: 1
            },
            lesson_video: "required",
        },
        messages: {
            lesson_name: {
                required: "Không Được Bỏ Trống Tên Bài Học",
            },
            lesson_STT: {
                required: "Không Được Bỏ Trống Số Thứ Tự",
                number: "Sai Định Dạng",
                min: "Giá Nhỏ nhất Là 1"
            },
            lesson_video: "Hãy Nhập Link Video",
        },
        submitHandler: function (form) {
            $.ajax({
                url: location.href,
                type: "POST",
                data: {
                    lesson_name: $('#lesson_name').val(),
                    lesson_video: $('#lesson_video').val(),
                    lesson_STT: $('#lesson_STT').val(),
                },
            })
                .then(function (data) {
                    $('#register_form').hide(100)
                    $('#tb_dk_tc').text(data.message);
                    $('.tong_ttba').show(200);
                })
                .catch(function (err) {
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-danger");
                    $('#tb_dk').text(err.responseJSON.message);
                    $('#tb_dk').show(200);
                    $('#btn_create').hide(200);
                })

        }
    });
})

function delete_lesson(link) {
    let a = confirm("Bạn có muốn xóa bài học này ?")
    if (a == true) {
        $.ajax({
            url: link,
            type: "POST",
        })
            .then(function (data) {
                $(`#${data.id}`).hide(200)
            })
            .catch(function (err) {
                alert(err.message)
            })
    }
}

function join_lesson(link) {
    $.ajax({
        url: link,
        type: "POST",
    })
        .then(function (data) {
            let btn_hocngay = `
                <button id="btn_hocngay">Học Ngay</button>
            `
            $("#btn_dk_khoahoc").remove();
            $("#chua_btn").append(btn_hocngay)
        })
        .catch(function (err) {
            alert(err.responseJSON.message)
        })
}
$('input').focus(function () {
    $('#tb_dk').hide(200);
    $('#btn_create').show(200);
})