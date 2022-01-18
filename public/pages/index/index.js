

async function getName(id) {
    return fetch("/api/users/" + id).then((data) => {
        return data.json();
  
    }).then((completedata) => {
        console.log(completedata.username);
        
        return completedata.username;
        
    }).catch((err) => {
        console.log(err);
    });
}

async function getPfP(id) {
    return fetch("/api/users/" + id).then((data) => {
        return data.json();
  
    }).then((completedata) => {
        console.log(completedata.profilePicture);
        
        return completedata.profilePicture;
        
    }).catch((err) => {
        console.log(err);
    });
}


fetch("/api/posts/timeline/all")
.then((data) => {
    return data.json();
})
.then(async (completedata) => {
    completedata.map(async (values) => {
        const name = await getName(values.userId)
        const pfp = await getPfP(values.userId)
        const postData = `
        
    <div class="post">
        <div id="postWrapper">
            <div class="postTop">
                <div class="postTopLeft">
                    <img class="postProfileImg" src="${pfp}" />
                    <span class="postUsername"> ${name} </span>
                    <span class="postDate"> ${values.createdAt} </span>
                </div>
                <div class="postTopRight">
                    ...
                </div>
            </div>

            <div class="postCenter">
                <span class="postText"> ${values.desc} </span>
                <img class="postImg" src="${values.img}" />
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
    document.getElementById("postContainer").insertAdjacentHTML("afterbegin", postData);
    });
}).catch((err) => {
    console.log(err);
});





function createPost(){

    
    let formData = new FormData();

    formData.append("postImg", input.files[0]);
    formData.append("desc", document.getElementById("desc").value);
    formData.append("userId", "61e55762c46d838aca51aa5a");
    
    fetch("/api/posts/", {
        method: "POST",
        body: formData
        
       // ({
       //     desc: document.getElementById("desc").value,
       //     userId: "61e55762c46d838aca51aa5a"
       // })
    }).then(res => {
        if (res.status == 200) {
            console.log("Post created")
            setTimeout(() => location.href= "/index", 1500);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}



const postForm = document.getElementById("postForm");
const postImg = document.getElementById("postImg");

postForm.addEventListener ("submit",  e => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("desc", document.getElementById("desc").value);
    formdata.append("postImg", postImg.files[0]);
    formdata.append("userId", "61e55762c46d838aca51aa5a");
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("/api/posts/", requestOptions)
      .then(response => response.text(),
      setTimeout(() => location.href= "/index", 500))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
});



