import React from 'react';
import './WeatherApp.css';
import { LocationSearchBar } from "../LocationSearch/LocationSearch";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import api  from "../../services/weather-service";
import { Grid, Slide, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';


class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            iconId: '',
            description: '',
            temp: '',
            humidity: '',
            feelsLike: '',
            hasData: false,
            hasError: false
        };
        this.onLocationSubmit = this.onLocationSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    onLocationSubmit(city) {
        if (city){
            api.getWeatherByCity(city).then((weatherData) => {
                if (weatherData.data.main && weatherData.data.weather[0]) {
                    this.setState({
                        cityName: weatherData.data.name,
                        iconId: weatherData.data.weather[0].id,
                        description: weatherData.data.weather[0].main,
                        temp: weatherData.data.main.temp,
                        humidity: weatherData.data.main.humidity,
                        feelsLike: weatherData.data.main.feels_like,
                        hasData: true,
                        hasError: false
                    });
                }
            }).catch((e) =>
                this.setState({ hasError: true }
            ));
        }
    }

    closeAlert() {
        this.setState({ hasError: false })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <LocationSearchBar
                                    onLocationSubmit={this.onLocationSubmit}>
                                </LocationSearchBar>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <Slide direction="up" in={this.state.hasData} mountOnEnter unmountOnExit>
                                    <CurrentWeather
                                        cityName = {this.state.cityName}
                                        iconId = {this.state.iconId}
                                        description = {this.state.description}
                                        temp = {this.state.temp}
                                        humidity = {this.state.humidity}
                                        feelsLike = {this.state.feelsLike}
                                    >
                                    </CurrentWeather>
                                </Slide>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        open={this.state.hasError}
                        autoHideDuration={6000}
                        onClose={this.closeAlert}
                    >
                        <MuiAlert elevation={6} variant="filled" severity="error">
                            Unable to retrieve weather data.
                        </MuiAlert>
                    </Snackbar>
                </div>
            </div>
        )
    }
}

export default WeatherApp;
