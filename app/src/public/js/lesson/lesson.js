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
            console.log(data)
            let btn_hocngay = `
                <a href="/student/${data.course_id}/lerninglesson/${data.lesson_id}"><button id="btn_hocngay">Học Ngay</button></a>
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



/* xóa member */
function xoa_member(email) {
    let kt = confirm("Bạn có chắc chắn muốn xóa người này ra khỏi lớp học ?")
    if (kt) {
        $.ajax({
            url: window.location,
            type: "DELETE",
            data: {
                member: email
            }
        })
            .then(function (data) {
                let new_count = Number($("#count").text()) - 1
                $("#count").text(new_count)
                let a = document.getElementById(data.email)
                a.remove();
            })
            .catch(function (err) {
                alert(err.responseJSON.message)
            })
    }
}

/* thoat lớp */
function thoatlop(course_id) {
    let kt = confirm("Bạn có chắc chắn muốn Thoát ra khỏi lớp học này ?")
    if (kt) {
        $.ajax({
            url: `/student/${course_id}/outcourse`,
            type: "DELETE",
        })
            .then(function (data) {
                $(`#${data.course_id}`).remove()
                let toan_khoa = document.getElementsByClassName("toan_khoa")
                if (toan_khoa.length == 0) {
                    $("#co").remove();
                    $("#tong").append(`
                   <div class="chuadkkh">
                   <h6>Rât tiết !! Bạn chưa tham gia khóa học nào</h6>
                   <div class="dkn">
                    <a href="/home">
                    <button type="button" class="btn btn-primary">Đi đến các khóa học</button>
                    </a>
                   </div>
               </div>
                   `)
                }
            })
            .catch(function (err) {
                alert(err.responseJSON.message)
            })
    }
}

/* xóa bt */
function xoa_bt(course_id, lesson_id, bt_id) {
    let kt = confirm("Bạn Có Chắc Chắn Muốn Xóa Bài Tập Này")
    if (kt == true) {
        $.ajax({
            url: `/teacher/delete_exercise/${course_id}/${lesson_id}/${bt_id}`,
            type: "DELETE",
        })
            .then(function (data) {
                $(`#${bt_id}`).remove()
            })
            .catch(function (err) {
                alert(err.responseJSON.message)
            })
    }
}