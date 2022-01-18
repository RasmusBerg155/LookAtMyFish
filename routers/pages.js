const router = require("express").Router();

const { createPage } = require("../render.js");
const { frontPage } = require("../render.js");

const loginPage = frontPage("login/login.html", {title: "Look At My Fish | Login"});
const registerPage = frontPage("register/register.html", {title: "Look At My Fish | Register"});
const indexPage = createPage("index/index.html", {title: "Look At My Fish | Index"})
const profilePage = createPage("profile/profile.html", {title: "Look At My Fish | Profile"})
const messagesPage = createPage("messages/messages.html", {title: "Look At My Fish | Messages"})

router.get("/login", (req, res) => {
    res.send(loginPage);
});

router.get("/register", (req, res) => {
    res.send(registerPage);
});

router.get("/index", (req, res) => {
    if(req.session.loggedIn){
    res.send(indexPage);
    } else {
        res.redirect("/login")
    }
});

router.get("/profile", (req, res) => {
    if(req.session.loggedIn){
        res.send(profilePage);
    } else {
        res.redirect("/login")
    }
});

router.get("/messages", (req, res) => {
    if(req.session.loggedIn){
        res.send(messagesPage);
    } else {
        res.redirect("/login")
    }
});

router.get("/", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;