function displayWait(selector) {

    $(selector).block({
        message: '<div class="blockui-default-message"><i class="fa fa-circle-o-notch fa-spin"></i><h6>Processing . . .</h6></div>',
        overlayCSS:  {
            background: 'rgba(142, 159, 167, 0.8)',
            opacity: 1,
            cursor: 'wait'
        },
        css: {
            width: '50%'
        },
        blockMsgClass: 'block-msg-default'
    });
}


function cancelWait(selector) {
    $(selector).unblock()
}


function loadComments (postId) {
    $.ajax({
       type: "get",
       url: "/comment/read/"+postId,
       success: function (response) {
         $("#commentColumn").append(response);
       },
       error: function (error) {
         $("#commentColumn").append("Error Loading Comments Try Again pls");
       }
    });
}

function loadCommentReplies (postId, commentId) {
    $.ajax({
        type: "get",
        url: "/comment/replies/"+ postId + "/" + commentId,
        success: function (response) {
            $("#reply_"+commentId).append(response);
            cancelWait("#comment_" + commentId);
            $("#vreplyBt_" + commentId + "").hide("slow");
        },
        error: function (error) {
            cancelWait("#comment_" + commentId);
            $("#reply_" + commentId).append("Error Loading Comments Try Again pls");
        }
    });
}


$("#searchForm").on("submit", function(event) {
    event.preventDefault();
    console.log("called");
    if($("#keywords").val().length > 3) {
        location.href = "/search/" + $("#keywords").val();
    }
});


