$("#btn_thembt").click(function () {
    $("#form_them_bt").validate({
        rules: {
            input: "required",
            output: "required",
            goiy: "required"
        },
        messages: {
            input: "Hãy Nhập Đề Bài",
            output: "Hãy Nhập Kết Quả",
            goiy: "Nhập Vào Gợi Ý Bài Làm"
        },
        submitHandler: function (form) {
            $("#bt_btn").hide(200)
            $.ajax({
                url: window.location,
                type: "POST",
                data: {
                    question: $("#txt_question").val(),
                    input: $("#txt_input").val(),
                    output: $("#txt_output").val(),
                    document: $("#txt_goiy").val(),
                }
            })
                .then(function (data) {
                    $("#form_them_bt").hide(200);
                    let tb = ` <div>
                    <div class="tb_tc_ alert alert-success" role="alert">
                        Bạn Đã Thêm Bài Tập Thành Công
                    </div>
                    <div style="text-align: center;margin-bottom:40px">
                        <a href="/teacher/${data.data.course_id}/detailsclass">
                            <button type="button" class="btn btn-success">Quay Lại Khóa Học</button>
                        </a>
                        <a href="">
                            <button type="button" class="btn btn-primary">Tiếp Tục Thêm Bài Tập</button>
                        </a>
                    </div>
                </div>`;
                    $("#tong_them").append(tb)
                })
                .catch(function (err) {
                    $("#bt_btn").show(200)
                    alert(err.responseJSON.message)
                })
        }
    });
})
$("#btn_update_exercise").click(function () {
    $("#sua_exercise").validate({
        rules: {
            input: "required",
            output: "required"
        },
        messages: {
            input: "Hãy Nhập Đề Bài",
            output: "Hãy Nhập Kết Quả",
        },
        submitHandler: function (form) {
            $("#bt_btn").hide(200)
            $.ajax({
                url: window.location,
                type: "POST",
                data: {
                    input: $("#txt_input").val(),
                    output: $("#txt_output").val()
                }
            })
                .then(function (data) {
                    $("#sua_exercise").hide(200);
                    let tb = ` <div>
                    <div class="tb_tc_ alert alert-success" role="alert">
                        Bạn Đã Cập Nhật Bài Tập Thành Công
                    </div>
                    <div style="text-align: center;margin-bottom:40px">
                        <a href="/teacher/${data.data.course_id}/detailsclass">
                            <button type="button" class="btn btn-success">OK</button>
                        </a>
                        <a href="">
                            <button type="button" class="btn btn-primary">Cập Nhật Lại</button>
                        </a>
                    </div>
                </div>`;
                    $("#tong_them").append(tb)
                })
                .catch(function (err) {
                    $("#bt_btn").show(200)
                    alert(err.responseJSON.message)
                })
        }
    });
})
