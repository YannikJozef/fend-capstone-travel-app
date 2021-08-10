// function to reset data
const clearData = (e) => {
    e.preventDefault();
    if (e.target.id == 'clear') {
        document.getElementById('travelCard').style.border = ``;
        document.getElementById('tripData').innerHTML = ``;
        document.getElementById('tripData').style.backgroundColor = ``;
        document.getElementById('destination').innerHTML = ``;
        document.getElementById('temperature').innerHTML = ``;
        document.getElementById('weather-description').innerHTML = ``;
        document.getElementById('city-img').removeAttribute('src');
        document.getElementById('clear').remove();
        document.getElementById('save').remove();
        document.getElementById('city-name').value = '';
        document.getElementById('date-start').value = '';
    }
};

// Event handler to reset all data in the upper container, where data is entered

document.getElementById('holderClear').addEventListener('click', clearData);

export { clearData };
