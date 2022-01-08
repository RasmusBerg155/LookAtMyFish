const router = require("express").Router();

const { createPage } = require("../render.js");

const loginPage = createPage("login/login.html", {title: "Look At My Fish | Login"});



router.get("/", (req, res) => {
    res.send(loginPage);
});

module.exports = router;