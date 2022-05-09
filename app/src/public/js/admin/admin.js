$("#btn_seach").click(function () {
    $.ajax({
        url: "/admin/seache_course",
        type: "POST",
        data: {
            seach: $("#txt_seach").val()
        }
    })
        .then(function (data) {
            $("tbody").html("")
            for (let i = 0; i < data.data.length; i++) {
                let status = "";
                if (data.data[i].course_status == true) {
                    status = `<span style="color: rgb(5 165 2);font-weight: 700;"> Hoạt Động</span>`
                }
                else {
                    status = `<span style="color: red;font-weight: 700;">Ngưng Hoạt Động</span>`
                }
                let html = `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${data.data[i].course_name}</td>
                    <td>${data.data[i].tacgia}</td>
                    <td style="color: blueviolet;">${data.data[i].course_price} đ</td>
                    <td style="color: blueviolet;">${data.data[i].course_member.length}</td>
                    <td style="color: blueviolet;">${data.data[i].course_lesson.length}</td>
                    <td>
                       ${status}
                    </td>
                    <td>${data.data[i].dateCreater}</td>
                    <td>
                        <a href="/course/${data.data[i].course_id}/details">
                            <i class="icon_nhin fa-solid fa-eye"></i>
                        </a>
                    </td>
                </tr>
                `
                $("tbody").append(html)
            }
        })
        .catch(function (err) {
            alert(err.responseJSON.message)
        })
})

function xoa_user(email, id) {
    let kt = confirm("Bạn Có Chắc Chắn Muốn Xóa Người Dùng Này (Lưu ý: Nếu xóa User sẽ xóa hết toàn bộ tài nguyên của họ trên trang web) ?");
    if (kt) {
        $.ajax({
            url: "/admin/deleteuser",
            type: "DELETE",
            data: {
                email: email
            }
        })
            .then(function (data) {
                $(`#${id}`).remove()
            })
            .catch(function (err) {
                alert(err.responseJSON.message)
            })
    }
}

function xoa_feedback(_id) { 
    let kt = confirm("Bạn có chắc chắn muốn xóa Feedback này không ??")
    if (kt == true) {
        $.ajax({
            url: "/admin/deletefeedback",
            type: "DELETE",
            data: {
                _id: _id,
            }
        })
            .then(function (data) {
                $(`#${data.id}`).remove()
            })
            .catch(function (err) {
                alert(err.responseJSON.message)
            })
    }
}

function phanhoi_feedback(_id) {
    if ($("#noidung").val().trim() == "") {
        $("#tb").show(200)
    }
    else {
        $("#body_model").css("background", "#ededed")
        $("#body_model").append(`<div id="loader" class="loader"></div>`)
        $("#guimail").hide();
        $("#nutdong").hide();
        $("#noidung").prop("readonly", true)
        $.ajax({
            url: "/admin/phanhoi_feedback",
            type: "POST",
            data: {
                _id: _id,
                noidung: $("#noidung").val()
            }
        })
            .then(function (data) {
                $("#nutdong").show();
                $("#loader").remove()
                $("#noidung").hide()
                $("#body_model").append(`
                <div id="tb_guitc" class="alert alert-success" role="alert">
                    Phản Hồi Của Bạn Đã Được Gửi Đi
                </div>
                `)
            })
            .catch(function (err) {
                $("#loader").remove()
                $("#nutdong").show();
                $("#guimail").show(100);
                alert(err.responseJSON.message)
            })
    }
}
function focus_te() {
    $("#tb").hide(200)
}

function nutdong() {
    $("#body_model").css("background", "#fff")
    $("#tb_guitc").remove();
    $("#noidung").show()
    $("#noidung").val("")
    $("#noidung").prop("readonly", false)
    $("#guimail").show(100);
}