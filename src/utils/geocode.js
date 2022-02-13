const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3dhcG5pbGItMiIsImEiOiJja3ZzODV5ZnQwMTBlMnBqdHV5MzJvdGZyIn0.KiVWe2Ka8pV2efy64lHjZA&limit=1';

    if(address){
        request({url, json:true}, (error, {body}) => {
            let geoData = body;
            if(error){
                callback('Unable to connect', undefined);
            }
            else if(geoData.error){
                callback('Error occurred', undefined);
            }
            else if(geoData.features.length === 0){
                callback('Incorrect location', undefined)
            }
            else{
                const featuresData = body.features[0];
                const latitude = featuresData.center[0];
                const longitude = featuresData.center[1];
                const placeName = featuresData.place_name;
                callback(undefined, {
                    latitude:latitude,
                    longitude:longitude,
                    placeName:placeName
                });
            }
        })
    }
}

module.exports = geocode;