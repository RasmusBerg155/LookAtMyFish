/*
function registerUser(){
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
*/

//document.getElementById("register-user").addEventListener("click", registerUser)


const registerForm = document.getElementById("registerForm");
const profilePicture = document.getElementById("profilePicture");

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("username", document.getElementById("username").value);
    formdata.append("email", document.getElementById("email").value);
    formdata.append("password", document.getElementById("password").value);
    formdata.append("profilePicture", profilePicture.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("/api/auth/register/", requestOptions)
        .then(response => response.text(),
        setTimeout(() => location.href= "/", 500))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});