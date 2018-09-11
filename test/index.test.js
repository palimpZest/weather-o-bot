const assert = require('assert');
const { expect } = require('chai');
const request = require('request');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised).should();

const keys = require('../config/keys');

const wwoApiKey = keys.weatherAPIKey;

/**
 * Takes city and date args and returns output
 * @param {string} city Name of city.
 * @param {string} date A date.
 * @returns {string} response output.
 */
function callWeatherApi(city, date) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const host = 'http://api.worldweatheronline.com';
      const path = `${'/premium/v1/weather.ashx?format=json&num_of_days=1'
        + '&q='}${encodeURIComponent(city)}&key=${wwoApiKey}&date=${date}&date_format=iso8601`;
      const url = `${host}${path}`;
      request(url, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    }, 10);
  });
}

describe('callWeatherApi promise', () => {
  const newDate = new Date();
  const defaultDate = newDate.toISOString().substring(0, 10);
  it('should fulfill promise after Wwo call', () => callWeatherApi('London', defaultDate).should.eventually.be.fulfilled);
});

describe('Call to Wwo API', () => {
  const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?format=json&num_of_days=1&q=Paris&key=${wwoApiKey}&date=2018-09-11&date_format=iso8601`;

  it('returns status 200', (done) => {
    request(url, (error, response) => {
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
      const hasCurrConditionProp = Object.prototype.hasOwnProperty.call(
        JSONresponse.data,
        'current_condition',
      );
      expect(hasCurrConditionProp).to.be.true;
      done();
    });
  });

  it('returns maxtempC property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      const hasMaxTempCProp = Object.prototype.hasOwnProperty.call(
        JSONresponse.data.weather[0],
        'maxtempC',
      );
      expect(hasMaxTempCProp).to.be.true;
      done();
    });
  });

  it('returns maxtempF property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      const hasMaxTempFProp = Object.prototype.hasOwnProperty.call(
        JSONresponse.data.weather[0],
        'maxtempF',
      );
      expect(hasMaxTempFProp).to.be.true;
      done();
    });
  });

  it('returns mintempC property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      const hasMinTempCProp = Object.prototype.hasOwnProperty.call(
        JSONresponse.data.weather[0],
        'mintempC',
      );
      expect(hasMinTempCProp).to.be.true;
      done();
    });
  });

  it('returns mintempF property', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      const hasMinTempFProp = Object.prototype.hasOwnProperty.call(
        JSONresponse.data.weather[0],
        'mintempF',
      );
      expect(hasMinTempFProp).to.be.true;
      done();
    });
  });

  it('should equal number of characters in Date forecast', (done) => {
    request(url, (error, response, body) => {
      const JSONresponse = JSON.parse(body);
      assert.equal(JSONresponse.data.weather[0].date.length, 10);
      done();
    });
  });
});
