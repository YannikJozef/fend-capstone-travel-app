function updateUI (apiResponse) {
    
    // Declaring local variables for the updating of visible UI elements except for button
    
    const date1 = new Date().getTime();
    const date2 = new Date(document.getElementById('date-start').value).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDif = Math.round(( date2 - date1 ) / oneDay);
    const trCard = document.getElementById('travelCard');
    const dest = document.getElementById('destination');
    const temp = document.getElementById('temperature');
    const weDesc = document.getElementById('weather-description');
    const img = document.getElementById('city-img');
    const trip = document.getElementById('tripData'); 

    // Declaring local variables to get holders for button and for containers that will be appended new elements to

    const entryElement = document.getElementById('entryHolder');
    const buttonElement = document.getElementById('holderClear');
    const checkSave = entryElement.contains(document.getElementById("save"));
    const checkClear = buttonElement.contains(document.getElementById("clear"));    

    // Functionality to replace empty html elements in index.html with predescribed content and with data from the API

    trCard.style.border = `solid darkgrey 2px` ;
    dest.innerHTML = `${apiResponse['name']}, <span class = "light">${apiResponse['country']} is ${dateDif} days away</span>` ;
    temp.innerHTML = `Max Temperature:<span class = "light"> ${apiResponse['highTemp']} C°</span>, lowest temperature: <span class = "light">${apiResponse['lowTemp']} C°</span>`;
    weDesc.innerHTML = `Weather: <span class = "light">${apiResponse['description']}</span>`;
    img.setAttribute('src', apiResponse['urlPicture']);
    trip.style.backgroundColor = `Orange`;
    trip.style.width = '100%';
    img.style.width = '100%';
    trip.innerHTML = `Trip Data`

    // Conditional checking, if buttons exist "save button" & "Clear button", if not, they are being created and appended to their parent element

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

    //Event Listener Function to save the displayed trip to the bottom of the webpage
    document.getElementById('save').addEventListener('click', Client.saveTrip);

};

export {
    updateUI
}