import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

// Wanted to generate a random anime when someone enters the website
app.get("/", async (req, res) => {
    try {
        // To keep the content 'safe for work' I implemented a parameter from the API itself to only show content with a rating no higher than 17 years of age. No content with a rating of 18+ will be shown here.
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

// This is my attempt to add a filter feature for this project, though it's still a working progress.
app.post("/ratings", async (req, res) => {
    try {
        const rating = req.body.rating;
        const result = await axios.get(API_URL + "random/anime?sfw=true&rating=" + encodeURIComponent(rating));
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