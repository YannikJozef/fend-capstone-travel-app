/* Global Variables */
const baseURL = `http://api.geonames.org/searchJSON?q=`;
const apiKey = '&maxRows=100&username=yannikj.';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

//Event Listener Function to initiate other functions
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const cityName = document.getElementById('city').value;
    const feeling = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, apiKey).then(function (data) {
        postData('/addData', {
            name: data.name,
            temperature: data.main.temp,
            date: newDate,
            feeling: feeling
        })
    }).then(function () {
        updateUI()
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

//Creating Post Request
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
const updateUI = async () => {
    const res = await fetch('/all');
    try {
        const data = await res.json();
        document.getElementById('date').innerHTML = data['date'];
        document.getElementById('temp').innerHTML = data['temperature'];
        document.getElementById('content').innerHTML = data['feeling'];
    } catch (error) {
        console.log('error', error);
    }
}

export {
    performAction,
    getWeather,
    postData,
    getData,
    updateUI
}