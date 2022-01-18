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
          //  toastr.success("Logging in...")
            console.log("Login successful")
            setTimeout(() => location.href= "/index", 1500);
        }
        else {
           // toastr("User doesnt exist")
            console.log("Error:", res.status)
        };
    });
};

document.getElementById("login-button").addEventListener("click", login);

