const photo        =  document.getElementById('photoprofile').getAttribute('src');
const username     =  document.getElementById('username').value;
const userId     =  document.getElementById('userId').value;
const content      =  document.getElementById('postForm');

function sendNewPost(){
    const image = document.getElementById('fileImage');
    const reader = new FileReader();
    const filename = image.files[0].name;
    console.log(userId);
    reader.onload = function(event) {
    
        const bytes = new Uint8Array(event.target.result); 
        socket.emit('post',{
            userId: userId,
            username: username,
            photo: photo,
            caption: content.value,
            bytes : bytes,
            filename: filename
        })
        };
    reader.readAsArrayBuffer(image.files[0]);
}

function previewPostImage(self) {
    var file = self.files;
    filename = file[0].name;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("post-img-preview").style.display = "";
            document.getElementById("post-img-preview").setAttribute("src", event.target.result);
            bytes = new Uint8Array(event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
    }
}

socket.on('newPost',data=> {
    console.log(data.username);
    console.log(data.photo);
    content.value = "";
    document.getElementById("fileImage").value = "";

    document.getElementById("post-img-preview").style.display = "none";
    document.getElementById("post-video-preview").style.display = "none";

    let html = "<div class='post border-bottom p-3 bg-white w-shadow'>";
        html += "<div class='media text-muted pt-3'>";
        html += "<img src='http://localhost:3000/userImage"+ data.photo +"' alt='Online user' class='mr-3 post-user-image'>";
        html += "</div>";
        html += "<div/>";
        html += "<div class='media-body pb-3 mb-0 small lh-125'>";
        html += "<div class='d-flex justify-content-between align-items-center w-100'>";
        html += "<a href='#' class='text-gray-dark post-user-name'>"+ data.username +"</a>";
        html += "<div class='dropdown'><a href='#' class='post-more-settings' role='button' data-toggle='dropdown' id='postOptions' aria-haspopup='true' aria-expanded='false'>";
        html += "<i class='bx bx-dots-horizontal-rounded'></i></a>";
        html += "<div class='dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu'>";
        html += "<a href='#' class='dropdown-item' aria-describedby='savePost'>";
        html += "<div class='row'><div class='col-md-2'><i class='bx bx-bookmark-plus post-option-icon'></i>";
        html += "</div><div class='col-md-10'><span class='fs-9'>Save post</span>";
        html += "<small id='savePost' class='form-text text-muted'>Add this to your saved items</small>";
        html += "</div></div></a><a href='#' class='dropdown-item' aria-describedby='hidePost'><div class='row'>";
        html += "<div class='col-md-2'><i class='bx bx-hide post-option-icon'></i></div><div class='col-md-10'>";
        html += "<span class='fs-9'>Hide post</span><small id='hidePost' class='form-text text-muted'>See fewer posts like this</small>";
        html += "</div></div></a><a href='#' class='dropdown-item' aria-describedby='snoozePost'><div class='row'>";
        html += "<div class='col-md-2'><i class='bx bx-time post-option-icon'></i></div><div class='col-md-10'>";
        html += "<span class='fs-9'>Snooze Lina for 30 days</span><small id='snoozePost' class='form-text text-muted'>Temporarily stop seeing posts</small>";
        html += "</div></div></a><a href='#' class='dropdown-item' aria-describedby='reportPost'><div class='row'><div class='col-md-2'>";
        html += "<i class='bx bx-block post-option-icon'></i></div><div class='col-md-10'><span class='fs-9'>Report</span>";
        html += "<small id='reportPost' class='form-text text-muted'>I'm concerned about this post</small></div>";
        html += "</div></a></div></div></div><span class='d-block'>3 hours ago <i class='bx bx-globe ml-3'></i></span>";
        html += "</div></div><div class='mt-3'><p>"+ data.caption+"</p></div><div class='d-block mt-3'><img src='http://localhost:3000/postImage/"+ data.filename +"' class='post-content' alt='post image'>";
        html += "</div><div class='mb-3'>";
        html += "<!-- Reactions -->";
        html += "<div class='argon-reaction'><span class='like-btn'><a href='#' class='post-card-buttons' id='reactions'><i class='bx bxs-like mr-2'></i> 67</a>";
        html += "<ul class='reactions-box dropdown-shadow'><li class='reaction reaction-like' data-reaction='Like'></li>";
        html += "<li class='reaction reaction-love' data-reaction='Love'></li><li class='reaction reaction-haha' data-reaction='HaHa'></li>";
        html += "<li class='reaction reaction-wow' data-reaction='Wow'></li><li class='reaction reaction-sad' data-reaction='Sad'></li>";
        html += "<li class='reaction reaction-angry' data-reaction='Angry'></li></ul>";
        html += "</span></div><a href='javascript:void(0)' class='post-card-buttons' id='show-comments'><i class='bx bx-message-rounded mr-2'></i> 5</a>";
        html += "<div class='dropdown dropup share-dropup'><a href='#' class='post-card-buttons' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
        html += "<i class='bx bx-share-alt mr-2'></i> Share</a><div class='dropdown-menu post-dropdown-menu'><a href='#' class='dropdown-item'>";
        html += "<div class='row'><div class='col-md-2'><i class='bx bx-share-alt'></i></div><div class='col-md-10'><span>Share Now (Public)</span>";
        html += "</div></div></a><a href='#' class='dropdown-item'><div class='row'><div class='col-md-2'><i class='bx bx-share-alt'></i>";
        html += "</div><div class='col-md-10'><span>Share...</span></div></div></a><a href='#' class='dropdown-item'>";
        html += "<div class='row'><div class='col-md-2'><i class='bx bx-message'></i></div><div class='col-md-10'><span>Send as Message</span></div>";
        html += "</div></a></div></div></div><div class='border-top pt-3 hide-comments' style='display: none;'><div class='row bootstrap snippet'>";
        html += "<div class='col-md-12'><div class='comment-wrapper'><div class='panel panel-info'><div class='panel-body'>";
        html += "<ul class='media-list comments-list'><li class='media comment-form'><a href='#' class='pull-left'>";
        html += "<img src='<%= `/images/posts/` %>' alt='' class='img-circle'></a><div class='media-body'>";
        html += "<form action='' method='' role='form'><div class='row'><div class='col-md-12'><div class='input-group'>";
        html += "<input type='text' class='form-control comment-input' placeholder='Write a comment...'>"
        html += "<div class='input-group-btn'>";
        html += "<button type='button' class='btn comment-form-btn data-toggle='tooltip' data-placement='top' title='Tooltip on top'><i class='bx bxs-smiley-happy'></i></button>";
        html += "<button type='button' class='btn comment-form-btn comment-form-btn' data-toggle='tooltip' data-placement='top' title='Tooltip on top'><i class='bx bx-camera'></i></button>";
        html += "<button type='button' class='btn comment-form-btn comment-form-btn' data-toggle='tooltip' data-placement='top' title='Tooltip on top'><i class='bx bx-microphone'></i></button>";
        html += "<button type='button' class='btn comment-form-btn' data-toggle='tooltip' data-placement='top' title='Tooltip on top'><i class='bx bx-file-blank'></i></button>";
        html += "</div></div></div></div></form></div>";
        html += "</li><li class='media'><a href='#' class='pull-left'><img src='/images/users/user-2.jpg' alt='' class='img-circle'>";
        html += "</a><div class='media-body'><div class='d-flex justify-content-between align-items-center w-10'>";
        html += "<strong class='text-gray-dark'><a href='#' class='fs-8'>Karen Minas</a></strong><a href='#'><i class='bx bx-dots-horizontal-rounded'></i></a>";
        html += "</div><span class='d-block comment-created-time'>30 min ago</span><p class='fs-8 pt-2'>";
        html += "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, <a href='#'>#consecteturadipiscing </a>.";
        html += "</p><div class='commentLR'><button type='button' class='btn btn-link fs-8'>Like</button>";
        html += "<button type='button' class='btn btn-link fs-8'>Reply</button></div></div></li><li class='media'>";
        html += "<a href='#' class='pull-left'><img src='https://bootdey.com/img/Content/user_2.jpg' alt='' class='img-circle'></a>";
        html += "<div class='media-body'><div class='d-flex justify-content-between align-items-center w-100'>";
        html += "<strong class='text-gray-dark'><a href='#' class='fs-8'>Lia Earnest</a></strong>";
        html += "<a href='#'><i class='bx bx-dots-horizontal-rounded'></i></a>";
        html += "</div><span class='d-block comment-created-time'>2 hours ago</span><p class='fs-8 pt-2'>";
        html += "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, <a href='#'>#consecteturadipiscing </a>.";
        html += "</p><div class='commentLR'><button type='button' class='btn btn-link fs-8'>Like</button>";
        html += "<button type='button' class='btn btn-link fs-8'>Reply</button></div></div></li>";
        html += "<li class='media'><a href='#' class='pull-left'><img src='https://bootdey.com/img/Content/user_3.jpg' alt='' class='img-circle'>";
        html += "</a><div class='media-body'><div class='d-flex justify-content-between align-items-center w-100'>";
        html += "<strong class='text-gray-dark'><a href='#' class='fs-8'>Rusty Mickelsen</a></strong><a href='#'><i class='bx bx-dots-horizontal-rounded'></i></a>";
        html += "</div><span class='d-block comment-created-time'>17 hours ago</span><p class='fs-8 pt-2'>";
        html += "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, <a href='#'>#consecteturadipiscing </a>.";
        html += "</p><div class='commentLR'><button type='button' class='btn btn-link fs-8'>Like</button>";
        html += "<button type='button' class='btn btn-link fs-8'>Reply</button>";
        html += "</div></div></li><li class='media'><div class='media-body'><div class='comment-see-more text-center'>";
        html += "<button type='button' class='btn btn-link fs-8'>See More</button></div></div></li></ul></div> </div></div>";
        html += "</div></div></div></div>";
    document.getElementById('posts').innerHTML += html;

    console.log(data);
})