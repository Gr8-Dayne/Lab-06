'use strict';

// this file was created with the assistance of Micah.

const PORT = process.env.PORT || 3077;
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());

// let error = {
//   status: '500',
//   responseText: 'Sorry, something went wrong'
// }


function Geolocation(latitude, longitude, formatted_address, search_query) {
  this.latitude = latitude,
  this.longitude = longitude,
  this.formatted_query = formatted_address,
  this.search_query = search_query
}

function Forcast(forecast, time) {
  this.forecast = forecast,
  this.time = getDate(new Date(time * 1000));
}

const newData = [];
app.get('/location', (request, response) => {
  const geoData = require('./data/geo.json');
  const geoDataResult = geoData.results[0];
  const geoDataGeometry = geoDataResult.geometry;
  const geoDataLocation = geoDataGeometry.location;
  newData.push(new Geolocation(geoDataLocation.lat, geoDataLocation.lng, geoDataResult.formatted_address, geoDataResult.address_components[0].short_name.toLowerCase()));
  if (request.query.data === newData[0].search_query) {
    response.send(newData[0]);
  }
  else if (request.query.data !== newData[0].search_query) {
    throw new Error('Oops, something went wrong');
  }
})

app.get('/weather', (request, response) => {
  const weatherData = require('./data/darksky.json');
  const dailyWeatherData = weatherData.daily;
  const dailyData = dailyWeatherData.data;
  const weatherArr = [];
  dailyData.forEach(val => {
    weatherArr.push(new Forcast(val.summary, val.time));
  })
  if (request.query.data.search_query === newData[0].search_query) {
    response.send(weatherArr);
  } else {
    throw new Error('Oops, something went wrong');
  }
})

function getDate(time) {
  const day = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let currentDate = `${day[time.getDay()]} ${month[time.getMonth()]} ${time.getDate()} ${time.getFullYear()}`;
  return currentDate;
}

app.listen(PORT, () => {
  console.log(`App is on PORT: ${PORT}`);
})

app.listen(PORT, () => {
  console.log(`App is on PORT: ${PORT}`);
})
