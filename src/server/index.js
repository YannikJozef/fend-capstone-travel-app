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
const gnApiKey = process.env.gnApiPw;

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
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

// Setup Server
const port = 8000;

const listening = () => {
    console.log('Server is running');
    console.log(`running on local host ${port}`);
};

const server = app.listen(port, listening);

// GET method route
const sendData = (req, res) => {
    console.log('Request Received');
    // console.log(projectData);
    res.send(projectData[0]);
};

app.get('/all', sendData);

// POST method route
app.post('/addData', async (req, res) => {
    
    // storing the data from client post request in Object "New Entry"

    let newEntry = {
        name: req.body.name,
        date: req.body.date,
        depDate: req.body.depDate
    };
    
    // Getting the index for requesting the forecast date dependent on the department date, 
    // when the department date exceeds the max. number of available days the forecast is set to the max 
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDif = Math.round(( newEntry.depDate - newEntry.date ) / oneDay)
    console.log(dateDif);
    const mDateDif = (dateDif > 15) ? 15:dateDif;

    // function to add object entries to an object
    const addElement = (elementList, element) => {
        let newList = Object.assign(elementList, element)
        return newList
    };

    // Requesting the additional data from geonames API (e.g. Longitude/Latitude)
    const responseGn = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.name}&maxRows=1&username=${gnApiKey}`)

    try {
        // Reassining new data to "newEntry" variable 
        const apiDataGn = await responseGn.json();
        newEntry = {
            name: apiDataGn.geonames[0].name,
            country: apiDataGn.geonames[0].countryName,
            date: newEntry.date,
            depDate: newEntry.depDate,
            mDateDif: mDateDif,
            lng: apiDataGn.geonames[0].lng,
            lat: apiDataGn.geonames[0].lat,
        };
        console.log(newEntry);

        // Requesting the additional data from the weatherforecast based on index derived from date difference between today and department date
        // Requesting the image link derived from input data 


        // weatherbit API Call
        const responseWb = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${newEntry.lat}&lon=${newEntry.lng}&key=${wbApiKey}&units=M`);

        // pixabay API Call
        let responsePx = await fetch(`https://pixabay.com/api/?key=${pixApiKey}&q=${req.body.name}&image_type=photo`);

        try {
                const apiDataWb = await responseWb.json();
                let apiDataPx = await responsePx.json();
                // creating objects based on the two different API Calls
                const elementWb = { lowTemp: apiDataWb.data[mDateDif].low_temp, highTemp: apiDataWb.data[mDateDif].high_temp, description: apiDataWb.data[mDateDif].weather.description };
                const elementPx = { urlPicture: apiDataPx.hits[0].webformatURL };
                // integrating the elements in the two objects to the newEntry Object
                addElement (newEntry, elementWb);
                addElement (newEntry, elementPx)
                // pushing newEntry to the projectData array
                projectData.push(newEntry);
                // console.log(newEntry);
                console.log('Post received');
                // sending the latest entry in projectData array
                res.send(projectData[projectData.length -1]);
                console.log(projectData[projectData.length -1])
                }
                catch (error) {
                console.log('error', error);
                responsePx = await fetch(`https://pixabay.com/api/?key=${pixApiKey}&q=ocean&image_type=photo`);
                    try {
                        const apiDataPx = await responsePx.json();
                        const oceanImg = { urlPicture: apiDataPx.hits[0].webformatURL }
                        console.log(oceanImg);
                        res.send(oceanImg)
                    }
                    catch (error) {
                        console.log('error', error);
                        res.send(error);
                    }
                }
    }
    catch (error) {
        console.log('error', error);
        // sending a picture of the ocean instead
        responsePx = await fetch(`https://pixabay.com/api/?key=${pixApiKey}&q=ocean&image_type=photo`);
        try {
            const apiDataPx = await responsePx.json();
            const oceanImg = { urlPicture: apiDataPx.hits[0].webformatURL }
            console.log(oceanImg);
            res.send(oceanImg)
        }
        catch (error) {
            console.log('error', error);
            res.send(error);
        }
    }
});
