/* Global Variables */
const baseURL = `http://api.geonames.org/searchJSON?q=`;
const apiKey = '&maxRows=1&username=yannikj.';
const pixApiKey = '22433349-90438b99a1f81d56be93e50f6';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();


//Event Listener Function to initiate other functions
document.getElementById('generate').addEventListener('click', submitHandler);

function submitHandler(e) {
    const cityName = document.getElementById('city-name').value;
    if(Client.checkInput()) {
        Client.getCity(baseURL, cityName, apiKey).then(function (data) {
            Client.postData('http://localhost:8000/addData', {
                name: data.geonames[0].name,
                country: data.geonames[0].countryName,
                lng: data.geonames[0].lng,
                lat: data.geonames[0].lat,
                date: new Date().getTime(),
                depDate: new Date(document.getElementById('date-start').value).getTime()
            }).then(response => {return response;}).then( (response) => { Client.updateUI(response) } )
        });
    }
}

async function  noNameFound () {
    const responsePx = await fetch(`https://pixabay.com/api/?key=${pixApiKey}&q=beach&image_type=photo`)
    console.log(responsePx);
    try {
        const apiDataPx = await responsePx.json();
        console.log(apiDataPx);
        const elementPx = { urlPicture: apiDataPx.hits[0].webformatURL };
        console.log(elementPx);
        document.getElementById('travelCard').style.border = `solid darkgrey 2px` ;
        document.getElementById('city-img').setAttribute('src', elementPx['urlPicture']);
        document.getElementById('destination').innerHTML = `` ;
        document.getElementById('temperature').innerHTML = ``;
        document.getElementById('weather-description').innerHTML = ``;
        document.getElementById('city-name').value = '';
        document.getElementById('date-start').value = '';
        console.log(elementPx['urlPicture']);
        if (document.getElementById('entryHolder').contains(document.getElementById("save")) == true) {
            document.getElementById('save').remove();
        };
        const trip = document.getElementById('tripData');
        const img = document.getElementById('city-img');
        img.onload = function (){ 
            const dims = img.getBoundingClientRect().width;
            trip.style.minWidth = dims + 'px';
            trip.style.backgroundColor = `Orange`;
            trip.style.width = '100%';
            img.style.width = '100%';
            trip.innerHTML = `Destination could not be found, Please check and try again! It is surely beautiful there!`
            console.log(dims);
        };
    } catch (error) {
        console.log('Error', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        if (newData.name == undefined) {
            console.log(newData)
            noNameFound(); } else {
            console.log(newData)
            return newData}
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

export {
    postData,
    noNameFound,
    submitHandler
}

