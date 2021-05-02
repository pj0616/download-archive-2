class Display {
    constructor() {
        this.location = document.querySelector('.card-header');
        this.image = document.querySelector('.imgconditions')
        this.weatherDesc = document.querySelector('.wdesc');
        this.temp = document.querySelector('.temp');
        this.humidity = document.querySelector('.humidity');
        this.windSpeed = document.querySelector('.wspeed');
    }

    displayResults(data) {
        this.location.textContent = input.value
        this.image.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        this.weatherDesc.textContent = data.weather[0].main
        this.humidity.textContent = `${data.main.humidity}%`

        //handle selection of measurement units
        if (selectUnits.value === "Metric") {
            this.temp.textContent = `${data.main.temp}°C`
            this.windSpeed.textContent = `${data.wind.speed} km/h`
        } else if (selectUnits.value === "Imperial") {
            this.temp.textContent = `${data.main.temp}°F`
            this.windSpeed.textContent = `${data.wind.speed} mph`
        } else {
            this.temp.textContent = `${data.main.temp}K`
            this.windSpeed.textContent = `${data.wind.speed} km/h`
        }
    }
}