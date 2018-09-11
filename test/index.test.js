const assert = require('assert');
const { expect } = require('chai');
const request = require('request');
const keys = require('../config/keys');

const wwoApiKey = keys.weatherAPIKey;

describe('Call to Wwo API', () => {
  const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?format=json&num_of_days=1&q=Paris&key=${wwoApiKey}&date=2018-09-11&date_format=iso8601`;

  it('returns status 200', (done) => {
    request(url, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('returns the weather from a city', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.request[0].type).to.equal('City');
      done();
    });
  });

  it('returns the weather from specific chosen city', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.request[0].query).to.equal('Paris, France');
      done();
    });
  });

  it('returns current conditions in city', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.hasOwnProperty('current_condition')).to.be.true;
      done();
    });
  });

  it('returns maxtempC property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.weather[0].hasOwnProperty('maxtempC')).to.be.true;
      done();
    });
  });

  it('returns maxtempF property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.weather[0].hasOwnProperty('maxtempF')).to.be.true;
      done();
    });
  });

  it('returns mintempC property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.weather[0].hasOwnProperty('mintempC')).to.be.true;
      done();
    });
  });

  it('returns mintempF property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      expect(JSONresponse.data.weather[0].hasOwnProperty('mintempF')).to.be.true;
      done();
    });
  });

  it('should equal number of characters in Date forecast', () => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      assert.equal(JSONresponse.data.weather[0].date, 10);
      done();
    });
  });
});
