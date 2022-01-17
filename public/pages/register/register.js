function createPosts(){
    fetch("/api/auth/register", {
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


document.getElementById("register-user").addEventListener("click", createPosts)

