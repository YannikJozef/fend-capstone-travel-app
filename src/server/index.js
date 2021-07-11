// dotenv configuration
const dotenv = require('dotenv');
const fetch = require("node-fetch");
dotenv.config();
const wbApiKey = process.env.wbApiKey;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

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
    res.send(projectData);
};

// POST method route
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
    // addElement (newEntry, {id: 'wow'})
    // newEntry.push({id: 'wow'})
    console.log(`https://api.weatherbit.io/v2.0/forecast/daily?city=${newEntry.name},NC&key=${wbApiKey}`);
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${newEntry.name},NC&key=${wbApiKey}`);
    try {
        const apiData = await response.json();
        const element = { lowTemp: apiData.data[0].low_temp, highTemp: apiData.data[0].high_temp, description: apiData.data[0].weather.description };
        console.log(element);
        addElement (newEntry, element);
        console.log(newEntry);
        // res.send(apiData);
    }
    catch (error) {
        console.log('error', error);
    };
    console.log('Post received');
    projectData = newEntry;
    // res.send(projectData);
    console.log(projectData);
});