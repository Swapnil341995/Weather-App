const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c6842b1af5215d833b5e5e01e5222432&query='+latitude+','+longitude+'&units=m';
    // const weatherUrl = 'http://api.weatherstack.com/current?access_key=c6842b1af5215d833b5e5e01e5222432&query=18.975,%2072.826&units=m';

    request({ url, json:true },(error, { body })=>{
        if(error){callback('Unable to connect', undefined)}
        else if(body.error){callback('Unable to get response. Check the location provided', undefined)}
        else{
            const data = body.current;
            console.log(`${data.weather_descriptions[0]}.It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`);
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. The humidity is ${data.humidity} percent.`);
            // callback(undefined, data);
        }
    })

}

module.exports = forecast;