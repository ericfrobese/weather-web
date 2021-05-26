const log = console.log
const request = require('postman-request')
// const {label:productLabel, stock, rating = 5} = product
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZXJpY2Zyb2Jlc2UiLCJhIjoiY2tvdHphcHh0MGUxczJvbnA3a21saXdvZyJ9.AR-pC9o25jk3W0kf-PaA_g&limit=1'
    request({url, json: true}, (error, {body}) => {
        // const {body} = response
        const {features} = body
         if (error) {
             callback('Unable to connect to location services!', undefined)
         }else if (features.length === 0) {
             callback('Unable to find location: '+ body.query[0])
         } else {
             callback(undefined, {latitude: features[0].center[1],
                                  longitude: features[0].center[0],
                                  location: features[0].place_name
             })
         }
    })
}

module.exports = geocode