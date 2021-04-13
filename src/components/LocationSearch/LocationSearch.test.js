import {fireEvent, isInaccessible, render, screen} from '@testing-library/react';
import { LocationSearchBar } from "./LocationSearch";

describe('LocationSearchBar', () => {

    let component;
    let onLocationSubmitMock = jest.fn();

    beforeEach(() => {
        component = render(<LocationSearchBar onLocationSubmit={onLocationSubmitMock}/>);
    });

    test('should be accessible', () => {
        expect(isInaccessible(component.baseElement)).toEqual(false);
    });

    test('should render input box and search button', () => {
        const inputBox = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button');

        expect(inputBox).toBeVisible();
        expect(inputBox.required).toEqual(true);
        expect(searchButton).toBeVisible();
        expect(searchButton.type).toEqual('submit');
    });

    test('should correctly pass input value to onSubmit function', () => {
        let expectedCity = 'Austin';
        let changeEvent = {
            preventDefault() {},
            target: { value: expectedCity }
        };
        let clickEvent = {
            preventDefault() {}
        };

        fireEvent.change(screen.getByRole('textbox'), changeEvent);
        fireEvent.click(screen.getByRole('button'), clickEvent);
        expect(onLocationSubmitMock).toHaveBeenCalledWith(expectedCity);
    });
});
