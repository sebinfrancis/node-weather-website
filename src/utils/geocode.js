const request = require('request');

const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2ViaW5mcmFuY2lzIiwiYSI6ImNrYWQxaWE5MjF6c3oyem14YXM4bTZjZXMifQ.gmrB9EqIqBqUL2r3bUNh6g&limit=1`;
    request({ url, json: true }, (error, { body: responseBody }) => {
        if (error) {
            callback('Unable to connect to mapbox service');
        } else if(!responseBody.features || responseBody.features.length === 0) {
            callback('Unable to get coordinates');
        } else {
            callback(undefined, {
                latitude: responseBody.features[0].center[1],
                longitude: responseBody.features[0].center[0],
                location: responseBody.features[0].place_name
            })
        }

    })
}

module.exports = geocode;