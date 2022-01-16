function login() {
    fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    }).then(res => {
        if (res.status == 200) {
            console.log("Login successful")
            setTimeout(() => location.href= "/index", 1500);
        }
        else {
            console.log("Error:", res.status)
        };
    });
};

document.getElementById("login-button").addEventListener("click", login);