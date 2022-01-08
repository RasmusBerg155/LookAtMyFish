const router = require("express").Router();

const { createPage } = require("../render.js");

const loginPage = createPage("login/login.html", {title: "Look At My Fish | Login"});
const registerPage = createPage("register/register.html", {title: "Look At My Fish | Register"});


router.get("/", (req, res) => {
    res.send(loginPage);
});

router.get("/register", (req, res) => {
    res.send(registerPage);
});

module.exports = router;