const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const pagesRoute = require("./routers/pages");

const { createPage } = require("./render.js");
const { urlencoded } = require("express");



dotenv.config();

mongoose.connect(
    process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
    console.log("Connected to MongoDB");
    }
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(pagesRoute);


app.listen(8080, () => {
    console.log("Server running on port 8080");
});