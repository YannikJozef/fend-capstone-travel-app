const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require("node-fetch");

//referring to the env file to get the API key
const wbApiKey = process.env.wbApiKey;
const pixApiKey = process.env.pixApiKey

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
app.post('/addData', async function (req, res) {
    const newEntry = {
        name: req.body.name,
        country: req.body.country,
        lng: req.body.lng,
        lat: req.body.lat,
        date: req.body.date,
        // feeling: req.body.feeling
    };
    
    function addElement (elementList, element) {
        let newList = Object.assign(elementList, element)
        return newList
    };
    // weatherbit API Call
    console.log(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${newEntry.lat}&lon=${newEntry.lng}&key=${wbApiKey}&units=M`);
    const responseWb = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${newEntry.lat}&lon=${newEntry.lng}&key=${wbApiKey}&units=M`);

    // pixabay API Call
    console.log(`https://pixabay.com/api/?key=${pixApiKey}&q=${req.body.name}&image_type=photo`);
    const responsePx = await fetch(`https://pixabay.com/api/?key=${pixApiKey}&q=${req.body.name}&image_type=photo`);

    try {
    const apiDataWb = await responseWb.json();
    const apiDataPx = await responsePx.json();
    const elementWb = { lowTemp: apiDataWb.data[0].low_temp, highTemp: apiDataWb.data[0].high_temp, description: apiDataWb.data[0].weather.description };
    const elementPx = { urlPicture: apiDataPx.hits[0].webformatURL };
    console.log(elementPx);
    addElement (newEntry, elementWb);
    addElement (newEntry, elementPx)
    projectData.push(newEntry);
    console.log(newEntry);
    console.log('Post received');
    projectData.push(newEntry);
    res.send(projectData[projectData.length -1]);
    console.log(projectData[projectData.length -1])}
    catch (error) {
    console.log('error', error);
    }
});