const error = 'Please input valid data!'

submitBtn.addEventListener('click', function (e) {
    let noSpaceInput = input.value.replace(/\s/g, "") //Negates global spaces in input
    if (noSpaceInput.substring(noSpaceInput.indexOf(',') + 1).length === 2) {
        getData();
    } else {
        selectErrorHeading.textContent = `${error}`
        errorAlert.style.display = 'block'
    }
    e.preventDefault();
});

//class instantiations 
function getData() {
    const weather = new Main(input.value, selectUnits.value)
    const location = new Display()
    weather.weatherData() //returns a promise, must use .then method to extract weather data
        .then(results => {
            location.displayResults(results);
            resultCard.style.display = 'block'
            errorAlert.style.display = 'none'
        })
        .catch(() => selectErrorHeading.textContent = `${errorMsg}. ${error}`)

}
