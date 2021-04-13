import axios from "axios";
import api from "./weather-service";

describe('Weather service', () => {
    jest.mock('axios');

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should call api with given parameters', async() => {
        expect.assertions(1);
        axios.get = jest.fn();
        await api.getWeatherByCity('Chicago');
        expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather',
            { params: { q: 'Chicago', appid: '6beddc795fda1db63a6c4115e543dd57', units: 'imperial' }});
    });
});