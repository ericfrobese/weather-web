const path = require('path')
const express = require('express')
const log = console.log
const hbs = require('hbs')
const { clearScreenDown } = require('readline')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup Static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get("", (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Eric Frobese'
    })
})

app.get("/about", (req,res) =>{
    res.render('about',{
        title: 'About page',
        name: 'Eric Frobese'
    })
})

app.get("/help", (req,res) =>{
    res.render('help',{
        title: 'Help Page',
        msg: 'Just enter a zip-code or city name into the search window.',
        name: 'Eric Frobese'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) { return res.send({error:'You MUST provide an address value'})}
    //res.send({address:req.query.address, location : "Nashua", forcast:"81 Bitchn' degrees Farenhieght"})
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        //log('Data:',data)
        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location,
                data: fdata
            })
          })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    } 
    log(req.query.search)
    res.send({prducts:[]})
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Not found 404 Page.',
        msg: 'Help artical not found.',
        name: 'Eric Frobese'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Not found 404 Page.',
        msg: 'Page not found.',
        name: 'Eric Frobese'
    })
})

app.listen(port, () => {
    log('Server is up on port: '+port)
})

