const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// Auth mangler session 




// register
router.post("/register", async (req, res) => {
    try{
        // hash the password
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // create User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // save and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});


// Login
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!user){
            return res.status(404).json("user not found");
        } else if (!validPassword){
            return res.status(404).json("wrong password")
        } 

        req.session.loggedIn = true;
        req.session.currentUser = user;
        return res.status(200).json(user);
    } catch (err) {
        console.log("yo5")
        res.status(500).json(err);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;

