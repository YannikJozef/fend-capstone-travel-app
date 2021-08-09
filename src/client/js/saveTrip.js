let counter = 0;
let deleteIds = [];

function saveTrip(e) {
    counter++;
    const travelElement = document.getElementById('travelCard');
    const clone = travelElement.cloneNode(true);
    clone.id = "clone" + counter;
    clone.setAttribute("class", "clone");
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
        console.log(`card${cardIndex}`);
	}});

export {
    saveTrip,
}