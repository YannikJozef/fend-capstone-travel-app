// Function to generate the initiate API calls and the UI updating
const submitHandler = (e) => {
    const cityName = document.getElementById('city-name').value;
    if (Client.checkInput()) {
        Client.postData('http://localhost:8000/addData', {
            name: cityName,
            date: new Date().getTime(),
            depDate: new Date(
                document.getElementById('date-start').value
            ).getTime(),
        })
            .then((response) => {
                return response;
            })
            .then((response) => {
                Client.updateUI(response);
            });
    }
};

// Function to be executed, when API receives an error and the trip (either image or name) could not be found
const noNameFound = (newData) => {
    const imgUrl = newData.urlPicture;
    console.log(imgUrl);

    // Declaring local variables for the updating of visible UI elements

    const trCard = document.getElementById('travelCard');
    const dest = document.getElementById('destination');
    const temp = document.getElementById('temperature');
    const weDesc = document.getElementById('weather-description');
    const img = document.getElementById('city-img');
    const trip = document.getElementById('tripData');
    const cName = document.getElementById('city-name');
    const sStart = document.getElementById('date-start');

    // Functionality to set html elements to empty strings and styling

    trCard.style.border = `solid darkgrey 2px`;
    img.setAttribute('src', imgUrl);
    dest.innerHTML = ``;
    temp.innerHTML = ``;
    weDesc.innerHTML = ``;
    cName.value = '';
    sStart.value = '';
    trip.style.backgroundColor = `Orange`;
    trip.style.width = '100%';
    img.style.width = '100%';
    trip.innerHTML = `Destination could not be found, Please check and try again! It is surely beautiful there!`;

    // checking and eventually removing save button
    if (
        document
            .getElementById('entryHolder')
            .contains(document.getElementById('save')) == true
    ) {
        document.getElementById('save').remove();
    }
};

// Post request to post data to the server, where the three APIs begin to work
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
            console.log(newData);
            noNameFound(newData);
        } else {
            console.log(newData);
            return newData;
        }
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
};

//Event Listener Function to generate the trip
document.getElementById('generate').addEventListener('click', submitHandler);

export { postData, noNameFound, submitHandler };
