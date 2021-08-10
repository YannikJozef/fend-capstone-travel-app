// Global variables used for the function down below
let counter = 0;
let deleteIds = [];

// Function to save trips
const saveTrip = (e) => {
    counter++;

    // declaring local variables based on existing and created elements and creating sequntial ids
    const travelElement = document.getElementById('travelCard');
    const clone = travelElement.cloneNode(true);
    const contentElement = document.getElementsByClassName('content')[0];
    const cardElement = document.createElement('div');
    const attributeObject = {
        entryHolderNew: 'entryHolder' + counter,
        entryOutputNew: 'entryOutput' + counter,
        cityImgNew: 'city-img' + counter,
        deleteNew: 'delete' + counter,
    };
    clone.id = 'clone' + counter;

    //setting attributes
    clone.setAttribute('class', 'clone');
    cardElement.setAttribute('class', 'card');
    cardElement.setAttribute('id', 'card' + counter);

    // Appending the elements to their parents
    contentElement.appendChild(cardElement);
    cardElement.appendChild(clone);

    // setting further attributes to be referenced
    const nodes = document
        .getElementById(clone.id)
        .childNodes[1].setAttribute('id', attributeObject.entryHolderNew);
    const nodes2 = document
        .getElementById('entryHolder' + counter)
        .childNodes[1].setAttribute('id', attributeObject);
    const nodes3 = document
        .getElementById('entryHolder' + counter)
        .childNodes[3].setAttribute('id', attributeObject.cityImgNew);
    const nodes5 = document
        .getElementById('entryHolder' + counter)
        .childNodes[5].setAttribute('id', attributeObject.deleteNew);
    const nodes6 = (document.getElementById(
        'entryHolder' + counter
    ).childNodes[5].innerHTML = 'Delete Trip');

    // making an overview array containing all the delete buttons including their ids, those are referenced later by event handler delegation
    deleteIds.push(attributeObject.deleteNew);

    // const checkScript = document.head.contains(document.getElementById('myScript'));
    // console.log(checkScript);
};

// Event Handler for deleting saved trips by event delegation function to prevent using an element befor its creation
document.querySelector('#content').addEventListener('click', (e) => {
    if (deleteIds.includes(e.target.id)) {
        const cardIndex = e.target.id[e.target.id.length - 1];
        document.getElementById(`card${cardIndex}`).remove();
        console.log(`card${cardIndex}`);
    }
});

export { saveTrip };
