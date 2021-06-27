/* Global Variables */
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = '&appid=390f72edc426bdba901258d9fa6b5c17&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

//Event Listener Function to initiate other functions
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
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
const getWeather = async (baseURL, zip, key) => {
    console.log(baseURL + zip + key);
    const res = await fetch(baseURL + zip + key);
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