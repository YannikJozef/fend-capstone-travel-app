function checkInput () {
    let x = document.getElementById('date-start').value;
    if (x == "") {
    alert("Departing date must be filled out");
    return false;
  } else {return true}
}

export {
    checkInput
}