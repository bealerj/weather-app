import { isInaccessible, render } from '@testing-library/react';
import WeatherApp from './WeatherApp';
import { LocationSearchBar } from "../LocationSearch/LocationSearch";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { mount } from 'enzyme';
import { Snackbar } from "@material-ui/core";
import api from "../../services/weather-service";
import { React } from "mdi-material-ui";
import MuiAlert from '@material-ui/lab/Alert';

configure({ adapter: new Adapter() });

describe("WeatherApp", () => {
  let component;

  test('should be accessible', () => {
    component = render(<WeatherApp/>);
    expect(isInaccessible(component.baseElement)).toEqual(false);
  });

  test('should render location bar and not render current weather or error snackbar', () => {
    component = mount(<WeatherApp/>);
    expect(component.containsMatchingElement(<LocationSearchBar/>)).toEqual(true);
    expect(component.containsMatchingElement(<CurrentWeather/>)).toEqual(false);
    expect(component.containsMatchingElement(<Snackbar/>)).toEqual(false);
  });

  test('should call api on location submission', () => {
    let mockApiFunction = jest.fn().mockResolvedValue({
      data: {
        main: {
          temp: 90,
          humidity: 60,
          feels_like: 98
        }
      },
      weather: [
        {
          id: 800,
          main: 'Clear'
        }
      ]
    });
    api.getWeatherByCity = mockApiFunction;
    component = mount(<WeatherApp/>);

    let expectedCity = 'Austin';
    component.find('LocationSearchBar').prop('onLocationSubmit')(expectedCity);
    component.update();

    expect(mockApiFunction).toHaveBeenCalledWith(expectedCity);
    expect(mockApiFunction).toHaveBeenCalledTimes(1);
  });

  test('should show snackbar on api error', async () => {
    api.getWeatherByCity = jest.fn().mockRejectedValue({});
    component = mount(<WeatherApp/>);

    await component.find('LocationSearchBar').prop('onLocationSubmit')('some city');
    await expect(api.getWeatherByCity).toHaveBeenCalled();
    component = component.update();

    expect(component.find('div.MuiAlert-message').length).toEqual(1);
  });
});
