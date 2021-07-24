/* Global Variables */
const baseURL = `http://api.geonames.org/searchJSON?q=`;
const apiKey = '&maxRows=1&username=yannikj.';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

//Event Listener Function to initiate other functions
document.getElementById('generate').addEventListener('click', performAction);

// function performAction(e) {
//     postData('http://localhost:8000/addData', {
//         name: 'Yannik',
//         country: 'Germany'
//     }).then(getData('http://localhost:8000/all'))
// };

function performAction(e) {
    const cityName = document.getElementById('city-name').value;
    // const feeling = document.getElementById('feelings').value;
    getWeather(baseURL, cityName, apiKey).then(function (data) {
        postData('http://localhost:8000/addData', {
            name: data.geonames[0].name,
            country: data.geonames[0].countryName,
            lng: data.geonames[0].lng,
            lat: data.geonames[0].lat,
            date: newDate,
            // feeling: feeling
        }).then(response => {return response;}).then( (response) => { updateUI(response) } )
    });
}

//async function to get data from open weather api
const getWeather = async (baseURL, city, key) => {
    console.log(baseURL + city + key);
    const res = await fetch(baseURL + city + key);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

// Creating Post Request
// const postData =  (url = '', data = {}) => {
//     fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header        
//     }); return
// }

// Creating Post Request
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
        console.log(newData);
        return newData
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

//async function for general GET Request
const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        // return allData;
        console.log(allData);
    } catch (error) {
        console.log('error', error)
    }
}

//async function to update UI
// const updateUI = async () => {
//     const res = await fetch('http://localhost:3000/all');
//     try {
//         const data = await res.json();
//         console.log(data.name);
//         const date1 = new Date(data.date).getTime();
//         const date2 = new Date(document.getElementById('date-start').value).getTime();
//         console.log(date1);
//         console.log(date2);
//         const oneDay = 1000 * 60 * 60 * 24;
//         const dateDif = Math.round(( date2 - date1 ) / oneDay);
//         document.getElementById('date').innerHTML = dateDif;
//         document.getElementById('city-display').innerHTML = data['name'];
//         document.getElementById('country-display').innerHTML = data['country'];
//         document.getElementById('lng-display').innerHTML = data['lng'];
//         document.getElementById('lat-display').innerHTML = data['lat'];
//         document.getElementById('content').innerHTML = data['feeling'];
//     } catch (error) {
//         console.log('error', error);
//     }
// }

function updateUI (apiResponse) {
    console.log(apiResponse);
    const date1 = new Date().getTime();
    const date2 = new Date(document.getElementById('date-start').value).getTime();
    console.log(date1);
    console.log(date2);
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDif = Math.round(( date2 - date1 ) / oneDay);
    document.getElementById('destination').innerHTML = `${apiResponse['name']}, <span class = "light">${apiResponse['country']} is ${dateDif} days away</span>` ;
    document.getElementById('temperature').innerHTML = `Max Temperature:<span class = "light"> ${apiResponse['highTemp']} C°</span>, lowest temperature: <span class = "light">${apiResponse['lowTemp']} C°</span>`;
    document.getElementById('weather-description').innerHTML = `Weather: <span class = "light">${apiResponse['description']}</span>`;
    document.getElementById('city-img').setAttribute('src', apiResponse['urlPicture'])
} 

export {
    performAction,
    getWeather,
    postData,
    getData,
    updateUI
}