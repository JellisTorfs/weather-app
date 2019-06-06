const request = require('request');

const forecast = (latitude, longitude, callback) => {
    let url = 'https://api.darksky.net/forecast/81404bafbbc14e0c1fc51b63b590cc08/'+latitude+','+longitude+'?units=si';
    request({url, json: true} , (error, response) => {
        if (error) {
            callback('Unable to perform request to weather services.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location for which to fetch weather data.', undefined)
        } else {
            const temperature = response.body.currently.temperature;
            const ozone = response.body.currently.ozone;
            const rainChance = response.body.currently.precipProbability;
            const todaySummary = response.body.daily.data[0].summary;
            callback(undefined, todaySummary + ' It is currently '+temperature+' degrees (C) out. There is a '+rainChance+'% chance of rain. Ozone = '+ozone);
        }
    });
};

module.exports = forecast;