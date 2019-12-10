'use strict'

const express = require('express');
const app = express(); //creates a server that is an object
app.use(express.static('./public'));
const PORT = process.env.PORT || 3035;
//this is a route
//called in browser http://localhost:3000/Portfolio
//response what will show on the browser
app.get('/location', function (request, response) {
  console.log('route portfiolio works');
  response.send('this is the response');
  //   const geoData = require('./data/geo.json');
  // console.log(geoData);
  // res.send({location : {
  //   'search_query': 'seattle',
  //   'formatted_query': 'Seattle, WA, USA',
  //   'latitude': '47.606210',
  //   'longitude': '-122.332071'
});

app.listen(PORT, function () {
  console.log('starting!');
});

