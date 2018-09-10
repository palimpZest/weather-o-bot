const express = require('express');
const http = require('http');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'weatherBot' });
});

router.get('/action', (req, res) => {
  res.send('weatheRobot action');
});

router.post('/action', (req, res) => {
  const host = 'api.worldweatheronline.com';
  // eslint-disable-next-line
  const wwoApiKey = process.env.WWO_API_KEY;
  /**
   * Takes city and date args and returns output
   * @param {string} city Name of city.
   * @param {string} date A date.
   * @returns {string} response output.
   */
  function callWeatherApi(city, date) {
    return new Promise((resolve, reject) => {
      // Create the path for the HTTP request to get the weather
      const path = `${'/premium/v1/weather.ashx?format=json&num_of_days=1'
        + '&q='}${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}`;
      console.log(`API Request: ${host}${path}`);

      // Make the HTTP request to get the weather
      http.get({ host, path }, (resp) => {
        let body = ''; // var to store the response chunks
        resp.on('data', (d) => {
          body += d;
        }); // store each response chunk
        resp.on('end', () => {
          // After all the data has been received parse the JSON for desired data
          const response = JSON.parse(body);
          const forecast = response.data.weather[0];
          const location = response.data.request[0];
          const conditions = response.data.current_condition[0];
          const currentConditions = conditions.weatherDesc[0].value;
          // Create response
          const output = `Current conditions in the ${location.type}
          ${location.query} are ${currentConditions} with a projected high of
          ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of
          ${forecast.mintempC}°C or ${forecast.mintempF}°F on
          ${forecast.date}.`;

          // Resolve the promise with the output text
          console.log(output);
          resolve(output);
        });
        resp.on('error', (error) => {
          console.log(`Error calling the weather API: ${error}`);
          reject();
        });
      });
    });
  }
  // Get the city and date from the request
  const city = req.body.queryResult.parameters['geo-city']; // city is a required param

  // Get the date for the weather forecast (if present)
  /* eslint-disable */
  let date = '';
  if (req.body.queryResult.parameters.date) {
    let date = req.body.queryResult.parameters.date;
    console.log(`Date: ${date}`);
  }
  /* eslint-enable */
  // Call the weather API
  callWeatherApi(city, date)
    .then((output) => {
      // Return the results of the weather API to Dialogflow
      res.send({ fulfillmentText: output });
    })
    .catch(() => {
      res.send({ fulfillmentText: "I don't know the weather but I hope it's good!" });
    });
});

module.exports = router;
