import CurrentWeather from "./CurrentWeather";
import { isInaccessible, screen, render } from '@testing-library/react';

describe('CurrentWeatherComponent', () => {

    test('should be accessible', () => {
        let component = render(<CurrentWeather {...getProps()}/>);
        expect(isInaccessible(component.baseElement)).toEqual(false);
    });

    [ { iconId: 302, iconType: 'WeatherRainy' },
        { iconId: 504, iconType: 'WeatherPouring' },
        { iconId: 203, iconType: 'WeatherLightningRainy' },
        { iconId: 610, iconType: 'WeatherSnowy' },
        { iconId: 708, iconType: 'WeatherTornado' },
        { iconId: 800, iconType: 'WeatherSunny' },
        {iconId: 806, iconType: 'WeatherCloudy' }
        ].forEach((scenario) => {
            test(`should display icon ${scenario.iconType} for iconId of ${scenario.iconId}`, () => {
                let props = getProps();
                props.iconId = scenario.iconId;
                let component = render(<CurrentWeather {...props}/>);

                let icon = component.getByTestId(scenario.iconType);
                expect(icon).toBeVisible();
            });
    });

    test('should display data in grid', () => {
        let props = getProps();
        render(<CurrentWeather {...props}/>);

        expect(screen.getByText(props.cityName)).toBeVisible();
        expect(screen.getByText(props.description)).toBeVisible();

        let temp = screen.getByTestId('temp');
        expect(temp).toBeVisible();
        expect(temp.innerHTML).toContain(props.temp);

        let humidity = screen.getByTestId('humidity');
        expect(humidity).toBeVisible();
        expect(humidity.innerHTML).toContain(props.humidity);

        let feelsLike = screen.getByTestId('feels-like');
        expect(feelsLike).toBeVisible();
        expect(feelsLike.innerHTML).toContain(props.feelsLike);
    });

});

function getProps() {
    return {
        iconId: 709,
        cityName: 'Austin',
        temp: 90.4,
        description: 'Clear',
        humidity: 80,
        feelsLike: 100.1
    }
}
