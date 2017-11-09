import React, { Component } from 'react';
import axios from 'axios';

// Save the root URL for the API call and our API key.
const ROOT_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '6a8b31e7cb833af88a3f7bf12d6825c1';

// Create the "App" component that holds all other components.
export default class App extends Component {

  // Call the constructor and initialize our state.
  constructor(props) {
    super();
    this.state = {
      location: '',
      icon: '',
      weather: '',
      temp: 0,
      tempUnit: 'C'
    };

    // Bind the context of "this" for our getWeather function.
    this.getWeather = this.getWeather.bind(this);
  }

  // When the component mounts, get the geolocation and call the
  // getWeather callback.
  componentDidMount() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather);
    }
    else {
      alert("Your browser doesn't support geolocation.")
    }
  }

  // The getWeather callback, makes the API call via axios and sets the state
  // for the rest of the application.
  getWeather(position) {

    // Get the lat and lon in easier to manage variables.
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Compose the url we'll pass to axios.
    const url = `${ROOT_URL}lat=${lat}&lon=${lon}&APPID=${API_KEY}`;

    // Make the API GET request, calling setState in the callback.
    const weatherData = axios.get(url).then(response => {
      this.setState({
        location: response.data.name,
        icon: response.data.weather.icon,
        weather: response.data.weather.main,
        temp: response.data.main.temp - 273.15,
        tempUnit: 'C'
      })
    })
  }

  // Finally, call the render function to get everything on screen.
  render() {
    return (
      <div>{this.state.location}</div>
    );
  }
}
