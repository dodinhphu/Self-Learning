$('#btn_creater').click(function () {
    $("#register_form").validate({
        rules: {
            coursename: {
                required: true,
            },
            courseprice: {
                required: true,
                number: true,
                min: 0
            },
            courseDescription: "required",
            course_result: "required",
            myfile: "required",
        },
        messages: {
            coursename: {
                required: "Không Được Bỏ Trống Tên Khóa Học",
            },
            courseprice: {
                required: "Không Được Bỏ Trống Giá",
                number: "Sai Định Dạng",
                min: "Giá Nhỏ nhất Là 0"
            },
            courseDescription: "Hãy Nhập Mô Tả Cho Khóa Học",
            course_result: "Hãy Nhập Kết Quả Đạt Được Của Khóa Học",
            myfile: "Chọn Ảnh Cho Khóa Học"
        },
        submitHandler: function (form) {
            let formdata = new FormData();
            let txt_coursename = $("#txt_coursename").val();
            let txt_courseprice = $("#txt_courseprice").val();
            let txt_coursedescription = $("#txt_coursedescription").val();
            let txt_course_result = $("#txt_course_result").val();
            let formFile = $("#formFile").get(0);
            let file_anh = formFile.files;
            formdata.append('course_name', txt_coursename);
            formdata.append('course_price', txt_courseprice);
            formdata.append('course_description', txt_coursedescription);
            formdata.append('course_result', txt_course_result);
            formdata.append('myfile', file_anh[0])
            $.ajax({
                url: "/teacher/createcourse",
                type: "POST",
                data: formdata,
                contentType: false,
                processData: false,
            })
                .then(function (data) {
                    $('#tieude').hide(100);
                    $('form').hide(100);
                    $('#tttong').removeClass();
                    $('#tttong').addClass("container-fluid");
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-success");
                    $('#tb_dk').text(data.message);
                    $('#tb_dk').show(200);
                    let e1 = html(data.data);
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

$('#btn_update').click(function () {
    $("#register_form").validate({
        rules: {
            coursename: {
                required: true,
            },
            courseprice: {
                required: true,
                number: true,
                min: 0
            },
            courseDescription: "required",
            course_result: "required",
            myfile: "required",
        },
        messages: {
            coursename: {
                required: "Không Được Bỏ Trống Tên Khóa Học",
            },
            courseprice: {
                required: "Không Được Bỏ Trống Giá",
                number: "Sai Định Dạng",
                min: "Giá Nhỏ nhất Là 0"
            },
            courseDescription: "Hãy Nhập Mô Tả Cho Khóa Học",
            course_result: "Hãy Nhập Kết Quả Đạt Được Của Khóa Học",
            myfile: "Chọn Ảnh Cho Khóa Học"
        },
        submitHandler: function (form) {
            let formdata = new FormData();
            let txt_courseid = $("#txt_courseid").val();
            let txt_coursename = $("#txt_coursename").val();
            let txt_courseprice = $("#txt_courseprice").val();
            let txt_coursedescription = $("#txt_coursedescription").val();
            let txt_course_result = $("#txt_course_result").val();
            let formFile = $("#formFile").get(0);
            let file_anh = formFile.files;
            formdata.append('course_id', txt_courseid);
            formdata.append('course_name', txt_coursename);
            formdata.append('course_price', txt_courseprice);
            formdata.append('course_description', txt_coursedescription);
            formdata.append('course_result', txt_course_result);
            formdata.append('myfile', file_anh[0])
            $.ajax({
                url: "/teacher/updatecourse",
                type: "POST",
                data: formdata,
                contentType: false,
                processData: false,
            })
                .then(function (data) {
                    $('#tieude').hide(100);
                    $('form').hide(100);
                    $('#tttong').removeClass();
                    $('#tttong').addClass("container-fluid");
                    $('#tb_dk').removeClass();
                    $('#tb_dk').addClass("alert alert-success");
                    $('#tb_dk').text(data.message);
                    $('#tb_dk').show(200);
                    let e1 = html(data.data);
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





$('.inpux_dk').focus(function () {
    $('#tb_dk').hide(200);
})


function html(data) {
    console.log(data)
    let html = `
                        <div class="row no-gutter">
                            <div style=" background-image: url('/upload/${data.course_img}');" class="col-md-6 d-none d-md-flex bg-images"></div>
                            <div class="col-md-6 bg-light">
                                <div class="shadow-lg bg-body rounded register d-flex ">
                                    <div class="container-fluid">
                                        <div id="toan_rgt" class="row">
                                            <br>
                                            <br>
                                            <div class="">
                                                <h6 style="text-align: center;margin-bottom:20px;font-size: 30px;">Chi
                                                    tiết khóa học
                                                </h6>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        ID &nbsp;</p>
                                                    <span>:  ${data.course_id} </span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Tên &nbsp;</p>
                                                    <span>:${data.course_name}</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Tác Giả &nbsp;</p>
                                                    <span>:${data.course_author}</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Giá &nbsp;</p>
                                                    <span style="color: #e90fc7;">:${formatCash(data.course_price.toString())}đ</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Thành Viên &nbsp;</p>
                                                    <span style="color: #e90fc7;">:${data.course_member.length}</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Bài Học &nbsp;</p>
                                                    <span style="color: #e90fc7;">:${data.course_lesson.length}</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Mô Tả &nbsp;</p>
                                                    <span>:${data.course_description}</span>
                                                </div>
                                                <div style="display: flex;margin-bottom:20px;">
                                                    <p
                                                        style="min-width: 90px;font-weight:600;color:#237b59;">
                                                        Kết Quả &nbsp;</p>
                                                    <span>:${load_kq(data)}</span>
                                                </div>
                                                <div style="text-align: end;">
                                                   <a href="/course/${data.course_id}/details">
                                                    <button type="button" class="btn btn-success">
                                                        Go to the course
                                                    </button>
                                                   </a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `
    return html;
}
function load_kq(data){
    
    let a='';
    for(let i = 0; i< data.course_result.length;i++){
        a+= `- ${data.course_result[i]} <br>`
    }
    return a
}
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}