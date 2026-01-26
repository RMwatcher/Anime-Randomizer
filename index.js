import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "random/anime?sfw=true");
        res.render("index.ejs", {
            list : result.data.data
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error : "It appears you made too many requests too quickly. Please wait a moment."
        })
    }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
});