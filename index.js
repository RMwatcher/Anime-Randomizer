import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/random/anime?sfw=true";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");

app.post("/", async (req, res) => {
    try {
        console.log(rating);
        const rating = req.body.rating;
        const response = await axios.get(API_URL + "&rating=" + rating);
        const result = response.data
        console.log(result);
        res.render("index.ejs", {
            list : result
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error : "We couldn't process your request at this time. Please try again.",
        });
    }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
});