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
        const result = await axios.get(API_URL + "random/anime?sfw=true", {
            timeout: 15000
        });

        const anime = result?.data?.data || {};

        if (!anime || Object.keys(anime).length === 0) {
            throw new Error("No anime data returned from the API.");
        }

        res.render("index.ejs", {
            list: anime,
            error: null
        });
    } catch (error) {
        const status = error?.response?.status;
        const message = status === 429
            ? "It appears you made too many requests too quickly. Please wait a moment."
            : "The anime service is temporarily unavailable. Please try again in a moment.";

        console.error("Failed to make request:", status || error?.code || error?.message);
        res.render("index.ejs", {
            error: message,
            list: {}
        });
    }
});


app.listen(port, () => {
    console.log("Server running on port: " + port);
});