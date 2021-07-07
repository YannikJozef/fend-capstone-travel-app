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
app.post('/addData', function (req, res) {

    const newEntry = {
        name: req.body.name,
        temperature: req.body.temperature,
        date: req.body.date,
        feeling: req.body.feeling
    }
    console.log('Post received');
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
});