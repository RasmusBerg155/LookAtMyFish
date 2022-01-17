fetch("/api/posts/timeline/all").then((data) => {
    // console.log(data);
    return data.json();
}).then((completedata) => {
    console.log(completedata);

    let postData = "";
    completedata.map((values) => {
        postData+= `
        
    <div class="post">
        <div id="postWrapper">

            <div class="postTop">
                <div class="postTopLeft">
                    <img class="postProfileImg" src="assets/profiles/profile1.jpg" />
                    <span class="postUsername"> ${values.userId} </span>
                    <span class="postDate"> ${values.createdAt} </span>
                </div>
                <div class="postTopRight">
                    ...
                </div>
            </div>

            <div class="postCenter">
                <span class="postText"> ${values.desc} </span>
                <img class="postImg" src="assets/posts/post1.jpg" />
            </div>

            <div class="postBottom">
                <div class="postBottomLeft">
                    <img src="./assets/svg/emoji.svg" class="shareIcon" />
                    <span class="postLikeCounter"> ${values.likes.length}</span>
                </div>

                <div class="postBottomRight">
                    <span class="postCommentText"> Comment goes here </span>
                </div>
            </div>
        </div>
    </div>

        
        
        `
    });

    document.getElementById("postContainer").innerHTML=postData;

}).catch((err) => {
    console.log(err);
});

function createPost(){
    fetch("/api/posts/", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify ({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    }).then(res => {
        if (res.status == 200) {
            console.log("Register successful")
            setTimeout(() => location.href= "/login", 1500);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}


