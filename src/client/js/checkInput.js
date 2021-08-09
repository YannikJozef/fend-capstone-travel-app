// function to check, if the departing date is filled ou, otherwise the user gets an alert

const checkInput = () => {
    let x = document.getElementById('date-start').value;
    if (x == "") {
    alert("Departing date must be filled out");
    return false;
  } else {return true}
}

export {
    checkInput
}