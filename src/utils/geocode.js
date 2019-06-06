const request = require('request');

const geocode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidG9yZnNqZWxsaXMiLCJhIjoiY2p3MGp4aXdoMDJsbzN6cGhnendrdmMzYiJ9.J9Lubt7Rw-1_KxE_FQqdsw&limit=1';

    request({url,json: true}, (error, response) => {
        if(error) {
            callback('Unable to perform request to geoLocation services.', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find coördinates for given location. Try another search term.', undefined);
        } else {
            let latitude = response.body.features[0].center[1];
            let longitude = response.body.features[0].center[0];
            let location = response.body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;