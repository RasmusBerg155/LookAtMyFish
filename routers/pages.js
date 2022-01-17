const router = require("express").Router();

const { createPage } = require("../render.js");

const loginPage = createPage("login/login.html", {title: "Look At My Fish | Login"});
const registerPage = createPage("register/register.html", {title: "Look At My Fish | Register"});
const indexPage = createPage("index/index.html", {title: "Look At My Fish | Index"})
const profilePage = createPage("profile/profile.html", {title: "Look At My Fish | Profile"})

router.get("/login", (req, res) => {
    res.send(loginPage);
});

router.get("/register", (req, res) => {
    res.send(registerPage);
});

router.get("/index", (req, res) => {
    res.send(indexPage);
});

router.get("/profile", (req, res) => {
    res.send(profilePage);
})

module.exports = router;