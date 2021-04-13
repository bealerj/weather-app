import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputBase, Paper } from "@material-ui/core";

class LocationSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { city: '' };
        this.updateCity = this.updateCity.bind(this);
        this.submitCity = this.submitCity.bind(this);
    }

    updateCity(e) {
        e.preventDefault();
        this.setState({ city: e.target.value})
    }

    submitCity(e) {
        e.preventDefault();
        this.props.onLocationSubmit(this.state.city);
    }

    render() {
        return (
            <Paper component="form" style={{minWidth: 400}} onSubmit={this.submitCity}>
                <InputBase
                    required
                    placeholder="Enter city name"
                    inputProps={{'aria-label' : 'Enter city name'}}
                    style={{minWidth: 300}}
                    onChange={this.updateCity}
                />
                <IconButton type="submit" aria-label='search' style={{justifySelf: "flex-end"}}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
        )
    }
}
export { LocationSearchBar };