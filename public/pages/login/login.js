function login() {
    fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    }).then(async res => {
        if (res.status == 200) {
            const user = await res.json();
            window.localStorage.setItem('user', JSON.stringify(user));
            console.log("Login successful");
            setTimeout(() => location.href= "/index", 1500);
        }
        else {
            console.log("Error:", res.status);
        };
    });
};

document.getElementById("login-button").addEventListener("click", login);

