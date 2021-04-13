import React from 'react';
import './CurrentWeather.css';
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import WeatherSunny from "mdi-material-ui/WeatherSunny";
import WeatherCloudy from "mdi-material-ui/WeatherCloudy";
import WeatherLightningRainy from "mdi-material-ui/WeatherLightningRainy";
import WeatherPouring from "mdi-material-ui/WeatherPouring";
import WeatherRainy from "mdi-material-ui/WeatherRainy";
import WeatherSnowy from "mdi-material-ui/WeatherSnowy";
import WeatherTornado from "mdi-material-ui/WeatherTornado";

class CurrentWeather extends React.Component{
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    getIconFromId() {
        if (this.props.iconId && this.props.iconId !== '') {
            if (this.isDrizzle()) {
                return <WeatherRainy data-testid="WeatherRainy" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isRain()) {
                return <WeatherPouring data-testid="WeatherPouring" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isThunderstorm()) {
                return <WeatherLightningRainy data-testid="WeatherLightningRainy" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isSnow()) {
                return <WeatherSnowy data-testid="WeatherSnowy" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isAtmosphere()) {
                return <WeatherTornado data-testid="WeatherTornado" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isClearSky()) {
                return <WeatherSunny data-testid="WeatherSunny" classes={{ root: "weather-icon"}}/>;
            }
            if (this.isClouds()) {
                return <WeatherCloudy data-testid="WeatherCloudy" classes={{ root: "weather-icon"}}/>;
            }
        }
        return null;
    }

    isDrizzle() {
        return this.getFirstDigitOfIconId() === '3';
    }

    isRain() {
        return this.getFirstDigitOfIconId() === '5';
    }

    isThunderstorm() {
        return this.getFirstDigitOfIconId() === '2';
    }

    isSnow() {
        return this.getFirstDigitOfIconId() === '6';
    }

    isClearSky() {
        return this.props.iconId === 800;
    }

    isClouds() {
        return this.getFirstDigitOfIconId() === '8';
    }

    isAtmosphere() {
        return this.getFirstDigitOfIconId() === '7';
    }

    getFirstDigitOfIconId() {
        return this.props.iconId.toString().charAt(0)
    }

    render() {
        const icon = this.getIconFromId();
        const cityName = this.props.cityName !== '' ? this.props.cityName : null;
        const temp = this.props.temp !== '' ? this.props.temp : null;
        const description = this.props.description !== '' ? this.props.description : null;
        const humidity = this.props.humidity !== '' ? this.props.humidity : null;
        const feelsLike = this.props.feelsLike !== '' ? this.props.feelsLike : null;
        return (
            <Card style={{ minWidth: 400, marginTop: 15}} variant="outlined">
                <CardContent>
                    <Typography gutterBottom component="h2">
                        {cityName}
                    </Typography>
                    <Grid container direction="row">
                        <Grid item>
                            <Grid container direction="column" alignItems="flex-start" justify="center" classes={{ root: "weather-column"}}>
                                <Grid item>
                                    {icon}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="flex-end" classes={{ root: "weather-column"}}>
                                <Grid item>
                                    <Typography data-testid='temp' component="h5">
                                        {temp}&deg;F
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="h5">
                                        {description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography data-testid='humidity' component="h5">
                                        Humidity {humidity}%
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography data-testid='feels-like' component="h5">
                                        Feels like {feelsLike}&deg;F
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}
export default CurrentWeather;