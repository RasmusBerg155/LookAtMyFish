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
                    <img src="./assets/svg/emoji.svg" class="shareIcon-${values._id} shareIcon" data-postId="${values._id}" />
                    <span class="postLikeCounter postLikeCounter-${values._id}">${values.likes.length}</span>
                </div>
            </div>
        </div>
    </div>

        
        
        `
        
    document.getElementById("postContainer").insertAdjacentHTML("afterbegin", postData);
    const likeButtons = document.querySelector(`.shareIcon-${values._id}`)
    likeButtons.addEventListener("click", () => {
        fetch(`/api/posts/${values._id}/like`, {method:"put"})
        .then((res) => res.text())
        .then((data) => {
            const postLikeCounter = document.querySelector(`.postLikeCounter-${values._id}`)
            const currentLikeCounter = parseInt(postLikeCounter.textContent)
            console.log(data, "The post has been disliked")
            if(data === "\"The post has been disliked\""){
                console.log("Hallo")
                postLikeCounter.textContent = currentLikeCounter - 1
            } else {
                postLikeCounter.textContent = currentLikeCounter + 1
            }
        });
    });
    console.log(likeButtons);
    });
}).catch((err) => {
    console.log(err);
});


const postForm = document.getElementById("postForm");
const postImg = document.getElementById("postImg");

postForm.addEventListener ("submit",  e => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("desc", document.getElementById("desc").value);
    formdata.append("postImg", postImg.files[0]);
    formdata.append("userId", JSON.parse(window.localStorage.getItem('user'))._id);
    
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

document.querySelector(".shareProfileImg").src = JSON.parse(window.localStorage.getItem('user')).profilePicture


