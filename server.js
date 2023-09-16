import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "https://cleanuri.com/api/v1/shorten";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.render("index.ejs");
})

app.post('/',async (req,res) => {
    const {link} = req.body;
    try {
        const response = await axios.post(API_URL, {url: link} );
        const result = JSON.stringify((response.data).result_url); //Convert the result from object to string
        res.render("index.ejs",{
            shortLink: result.replace(/"/g,'') //Remove the double quotes from the result
        });
    } catch (error) {
        console.log(`Cannot make request: ${error.message}`);
    }
})

app.listen(port,() => {
    console.log(`Connecting on port ${port}`);
})