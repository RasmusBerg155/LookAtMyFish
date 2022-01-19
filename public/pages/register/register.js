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
        .then(response => response.text())
        setTimeout(() => location.href= "/", 500)
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});