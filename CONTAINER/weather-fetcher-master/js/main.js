const API_KEY = 'bfa6ba262309a5d86a182c7896aaa6ce';
const submitBtn = document.getElementById('submitbtn');
const input = document.getElementById('search');
const selectUnits = document.querySelector('.custom-select');
const selectErrorHeading = document.querySelector('.statuserror')
const errorAlert = document.querySelector('.alert')
const resultCard = document.querySelector('.resultscard')
let errorMsg;

class Main {
    constructor(cityCountry, units) {
        this.API_KEY = 'bfa6ba262309a5d86a182c7896aaa6ce';
        this.cityCountry = cityCountry;
        this.units = units;
    }

    async weatherData() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.cityCountry}&appid=${this.API_KEY}&units=${this.units}`)
        if (!response.ok) { //Retrieve exact error code of GET call
            errorMsg = `${response.status}: ${response.statusText}`
            resultCard.style.display = 'none'
            errorAlert.style.display = 'block'
        } else {
            const data = await response.json();
            return data
        }
    }
}