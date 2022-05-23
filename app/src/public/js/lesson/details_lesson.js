var socket = io.connect("http://localhost:5000", { reconnection: false });
let lesson_id = window.location.pathname.split("/")[4];
let course_id = window.location.pathname.split("/")[2];
$(document).ready(function () {

})
function gui_tn(ma, course_id) {
    let content_tn = $("#txt_tn").val()
    $("#txt_tn").val("")
    if (content_tn.trim().length > 0) {
        socket.emit(ma, content_tn)
    }
}
socket.on(`server_${lesson_id}`, function (data) {
    if (data.data.length > 0) {
        $("#tong_message").append(`
    <div class="messageL">
           <div class="nguoigui">${data.name}</div>
           <span class="bubbleL">${data.data}</span>
       </div>
`)
        $('.messageL:last')[0].scrollIntoView({
            behavior: "smooth", block: 'center', inline: "nearest"
        });
    }
})
socket.on(`server_codon${lesson_id}`, function (data) {
    if (data.length > 0) {
        $("#tong_message").append(`
        <div class="messageR">
          <span class="bubbleR">${data}</span>
        </div>
        `)
        $('.messageR:last')[0].scrollIntoView({
            behavior: "smooth", block: 'center', inline: "nearest"
        });
        var scrolledY = window.scrollY;
    }
})


/* lấy danh sách online */


let ma_listonline = "mang-online" + course_id;
socket.on(ma_listonline, function (list_online) {
    $("#ds_ol").html("");
    list_online.forEach(user => {
        $("#ds_ol").append(`
                        <div class="ten_al">
                            <div class="item_user">
                                <i class="fa-solid fa-user"></i>
                                <span>${user.name} </span>
                            </div>
                            <i class="icon_dc fa-solid fa-earth-europe"></i>
                        </div>
        `)
    });
})