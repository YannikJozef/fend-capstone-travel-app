const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require("node-fetch");

//referring to the env file to get the API key
const wbApiKey = process.env.wbApiKey;

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// Initialize the index.html page, when entering root url
app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
});

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log('Server is running');
    console.log(`running on local host ${port}`);
};

// GET method route
app.get('/all', sendData);

function sendData(req, res) {
    console.log('Request Received');
    // console.log(projectData);
    res.send(projectData[0]);
};

// POST method route
// app.post('/addData', async function (req, res) {
//     const newEntry = {
//                 name: req.body.name,
//                 country: req.body.country,
//             };
//     console.log(newEntry);
//     // projectData.push(newEntry);
//     // console.log(projectData);
//     res.send(newEntry);
// })


// app.post('/addData', async function(req, res){
//     console.log(`https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.name},NC&key=${wbApiKey}`);
//     const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.name},NC&key=${wbApiKey}`);
//     try {
//         const apiData = await response.json();
//         console.log(apiData.data[0].high_temp);
//         return res.send(apiData.data[0]);
//     }
//     catch (error) {
//         console.log('error', error);
//     }
// })

app.post('/addData', async function (req, res) {
    const newEntry = {
        name: req.body.name,
        country: req.body.country,
        lng: req.body.lng,
        lat: req.body.lat,
        date: req.body.date,
        feeling: req.body.feeling
    };
    
    function addElement (elementList, element) {
        let newList = Object.assign(elementList, element)
        return newList
    };
    console.log(`https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.name},NC&key=${wbApiKey}`);
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.name},NC&key=${wbApiKey}`);
        try {const apiData = await response.json();
        const element = { lowTemp: apiData.data[0].low_temp, highTemp: apiData.data[0].high_temp, description: apiData.data[0].weather.description };
        addElement (newEntry, element);
        projectData.push(newEntry);
        console.log(newEntry);
        // res.send(projectData);
        console.log('Post received');
        projectData.push(newEntry);
        res.send(projectData[0]);
        console.log(projectData[0]); }
        catch (error) {
        console.log('error', error);
    }
});