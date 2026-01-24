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
    res.render("index.ejs", { list : result.data });

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log("Server running on port: " + port);
});