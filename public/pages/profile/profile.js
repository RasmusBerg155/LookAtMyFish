fetch("/api/users/61e55762c46d838aca51aa5a")
.then((data) => {
    console.log(data)
    return data.json();
})
.then((completedata) => {
    console.log(completedata)
    completedata.map((values) => {
        const userData = `
        <div class="profile">
            <div class="profileWrapper">
                <div class="userCreatedAt">${values.createdAt}</div>
                <div class="userFollowers">5 Following 1 Follower</div>
            </div>
        </div>
    </div>
        `

    document.getElementById("users", userData)
    });

}).catch((err) => {
    console.log(err);
})