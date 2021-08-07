/* Global Variables */
const baseURL = `http://api.geonames.org/searchJSON?q=`;
const apiKey = '&maxRows=1&username=yannikj.';
const pixApiKey = '22433349-90438b99a1f81d56be93e50f6';
console.log(process.env.pixApiKey);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

//Event Listener Function to initiate other functions
document.getElementById('generate').addEventListener('click', performAction);

function checkInput () {
    let x = document.getElementById('date-start').value;
    if (x == "") {
    alert("Departing date must be filled out");
    return false;
  } else {return true}
}

function performAction(e) {
    const cityName = document.getElementById('city-name').value;
    // const feeling = document.getElementById('feelings').value;
    if(checkInput()) {
        getWeather(baseURL, cityName, apiKey).then(function (data) {
            postData('http://localhost:8000/addData', {
                name: data.geonames[0].name,
                country: data.geonames[0].countryName,
                lng: data.geonames[0].lng,
                lat: data.geonames[0].lat,
                date: new Date().getTime(),
                depDate: new Date(document.getElementById('date-start').value).getTime()
                // feeling: feeling
            }).then(response => {return response;}).then( (response) => { updateUI(response) } )
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
        // document.getElementById('tripData').innerHTML = `Destination could not be found, Please check and try again! It is surely beautiful there!` ;
        // document.getElementById('tripData').style.backgroundColor = `Orange` ;
        // document.getElementById('tripData').style.maxWidth = `75%` ;
        document.getElementById('city-img').setAttribute('src', elementPx['urlPicture']);
        document.getElementById('destination').innerHTML = `` ;
        document.getElementById('temperature').innerHTML = ``;
        document.getElementById('weather-description').innerHTML = ``;
        document.getElementById('city-name').value = '';
        document.getElementById('date-start').value = '';
        console.log(elementPx['urlPicture']);
        if (document.getElementById('entryHolder').contains(document.getElementById("save")) == true) {
            document.getElementById('save').remove();
        }

        const trip = document.getElementById('tripData');
        const img = document.getElementById('city-img');
        img.onload = function (){ 
            const dims = img.getBoundingClientRect().width;
            trip.style.minWidth = dims + 'px';
            trip.style.backgroundColor = `Orange`;
            trip.innerHTML = `Destination could not be found, Please check and try again! It is surely beautiful there!`
            console.log(dims);
        };


        // return elementPx;
    } catch (error) {
        console.log('Error', error);
    }

};

//async function to get data from open weather api
const getWeather = async (baseURL, city, key) => {
    console.log(baseURL + city + key);
    const res = await fetch(baseURL + city + key);
    try {
        const data = await res.json();
        console.log(data);
        if (data.totalResultsCount !== 0) {
        return data } else { noNameFound() }
    } catch (error) {
        console.log('Error', error);
        // appropriately handle the error
    }
}

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

function updateUI (apiResponse) {
    console.log(apiResponse);


    const date1 = new Date().getTime();
    const date2 = new Date(document.getElementById('date-start').value).getTime();
    console.log(date1);
    console.log(date2);
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDif = Math.round(( date2 - date1 ) / oneDay);    
    document.getElementById('travelCard').style.border = `solid darkgrey 2px` ;
    document.getElementById('destination').innerHTML = `${apiResponse['name']}, <span class = "light">${apiResponse['country']} is ${dateDif} days away</span>` ;
    document.getElementById('temperature').innerHTML = `Max Temperature:<span class = "light"> ${apiResponse['highTemp']} C°</span>, lowest temperature: <span class = "light">${apiResponse['lowTemp']} C°</span>`;
    document.getElementById('weather-description').innerHTML = `Weather: <span class = "light">${apiResponse['description']}</span>`;
    document.getElementById('city-img').setAttribute('src', apiResponse['urlPicture']);
    const img = document.getElementById('city-img');
    const trip = document.getElementById('tripData');
    img.onload = function (){ 
        const dims = img.getBoundingClientRect().width;
        trip.style.minWidth = dims + 'px';
        trip.style.backgroundColor = `Orange`;
        trip.innerHTML = `Trip Data`
        console.log(dims);
    };

    const entryElement = document.getElementById('entryHolder');
    const buttonElement = document.getElementById('holderClear');
    const checkSave = entryElement.contains(document.getElementById("save"));
    const checkClear = buttonElement.contains(document.getElementById("clear"));    

        if (checkSave == false) {
        
        const buttonSave = document.createElement("button");
        const nodeSave = document.createTextNode("Save Trip");
        console.log(nodeSave);
        buttonSave.appendChild(nodeSave);
        buttonSave.setAttribute("id", "save");
        buttonSave.setAttribute("class", "lrgBtn");
        entryElement.appendChild(buttonSave);

            if(checkClear == false) {
                const buttonClear = document.createElement("button");
                const nodeClear = document.createTextNode("Clear Data");
                console.log(buttonClear);
                buttonClear.appendChild(nodeClear);
                buttonClear.setAttribute("id", "clear");
                buttonClear.setAttribute("class", "lrgBtn");
                buttonElement.appendChild(buttonClear);
            }
    }

    //Event Listener Function to initiate other functions
    document.getElementById('save').addEventListener('click', saveTrip);



};

let counter = 0;
let deleteIds = [];

function saveTrip(e) {
    counter++;
    const travelElement = document.getElementById('travelCard');
    const clone = travelElement.cloneNode(true);

    


    clone.id = "clone" + document.getElementById('city-name').value + counter;
    const contentElement = document.getElementsByClassName('content')[0];
    const cardElement = document.createElement('div');
    contentElement.appendChild(cardElement);
    cardElement.appendChild(clone);
    cardElement.setAttribute("class", "card");
    cardElement.setAttribute("id", "card" + counter);
    const attributeObject = {entryHolderNew: "entryHolder" + counter, entryOutputNew: "entryOutput" + counter, cityImgNew: "city-img" + counter, deleteNew: "delete" + counter} 
    // gute Idee hier auch noch einen Loop einzuführen, um die Ids mit einer 1 zu versehen
    const nodes = document.getElementById(clone.id).childNodes[1].setAttribute("id", attributeObject.entryHolderNew);
    const nodes2 = document.getElementById('entryHolder' + counter).childNodes[1].setAttribute("id", attributeObject);
    const nodes3 = document.getElementById('entryHolder' + counter).childNodes[3].setAttribute("id", attributeObject.cityImgNew);
    const nodes5 = document.getElementById('entryHolder' + counter).childNodes[5].setAttribute("id", attributeObject.deleteNew);
    const nodes6 = document.getElementById('entryHolder' + counter).childNodes[5].innerHTML = "Delete Trip"; 
    // document.getElementById(attributeObject.deleteNew).addEventListener("click", function() {document.getElementById('card' + counter).remove()});
    console.log(nodes3);
    deleteIds.push(attributeObject.deleteNew)
    console.log(deleteIds);


    const checkScript = document.head.contains(document.getElementById('myScript'));
    console.log(checkScript);
};


document.querySelector("#content").addEventListener('click', function(e) {
	if(deleteIds.includes (e.target.id)) {
		const cardIndex = e.target.id[e.target.id.length-1]
        document.getElementById(`card${cardIndex}`).remove()
        // alert('CLICKED');
        console.log(`card${cardIndex}`);
	}});


document.getElementById('holderClear').addEventListener('click', clearData);

function clearData (e) {
    if(e.target.id == 'clear') {
    document.getElementById('travelCard').style.border = `` ;
    document.getElementById('tripData').innerHTML = `` ;
    document.getElementById('tripData').style.backgroundColor = `` ;
    document.getElementById('destination').innerHTML = `` ;
    document.getElementById('temperature').innerHTML = ``;
    document.getElementById('weather-description').innerHTML = ``;
    document.getElementById('city-img').removeAttribute('src');
    document.getElementById('clear').remove();
    document.getElementById('save').remove();
    document.getElementById('city-name').value = '';
    document.getElementById('date-start').value = '';
    }
}

export {
    performAction,
    getWeather,
    postData,
    saveTrip,
    updateUI,
    clearData,
    checkInput,
    noNameFound
}