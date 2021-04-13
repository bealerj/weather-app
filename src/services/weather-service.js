import axios from "axios";

const apiKey = "6beddc795fda1db63a6c4115e543dd57";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

let getWeatherByCity = function(city) {
    return axios.get(`${baseUrl}`, {
        params: {
            q: city,
            appid: apiKey,
            units: "imperial"
        }
    });
}

const api = {
    getWeatherByCity
};
export default api;