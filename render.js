const fs = require("fs");

const nav = fs.readFileSync("./public/components/nav/nav.html", "utf8");
const footer = fs.readFileSync("./public/components/footer/footer.html", "utf8");

const sidebarLeft = fs.readFileSync("./public/components/leftbar/leftbar.html", "utf8");
const sidebarRight = fs.readFileSync("./public/components/rightbar/rightbar.html", "utf8");


function frontPage(path) {
    return (fs.readFileSync(`./public/pages/${path}`, "utf8"))
}

function createPage(path, options) {
    return (nav + sidebarLeft + fs.readFileSync(`./public/pages/${path}`, "utf8") + sidebarRight + footer)
    .replace("%%DOCUMENT_TITLE%%", options.title || "LookAtMyFish")
}

module.exports = {
    frontPage,
    createPage
};