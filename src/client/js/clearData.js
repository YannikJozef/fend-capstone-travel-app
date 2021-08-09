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
    clearData
}