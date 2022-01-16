function registerUser() {
fetch("/api/auth", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify ({
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    })
}).then(res => {
    if (res.status == 200) {
        console.log("Register successfull")
        setTimeout(() => location.href= "/login", 1500);
    }
    else {
        console.log("Error:", res.status)
    }
}) 
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("register-user").addEventListener("click", registerUser)
})
