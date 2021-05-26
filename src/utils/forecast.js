const log = console.log
const request = require('postman-request')

// const url = 'http://api.weatherstack.com/current?access_key=474a7fc2cc64b95db7443af1f4f7e328&query=37.8267,-122.4233&units=f'

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=474a7fc2cc64b95db7443af1f4f7e328&query='+lon+','+lat+'&units=f'
    //log('forecast created url: ' + url)
    request({ url, json: true}, (error,{body}) => {
        //const {body} = response
        const {current} = body
        if (error) {
            callback('Unable to connect to weather service!')
        }  else if (body.error) {
            callback('Unable to find location.')
        } else {
            callback(undefined, current.weather_descriptions[0] +'. It is currently ' + current.temperature + ' degrees out.  It feels like '+ current.feelslike + ' degrees out.')
    }})}

    module.exports = forecast 
