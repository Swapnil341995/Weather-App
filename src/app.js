const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.resolve(__dirname, '../public');
const viewsPath = path.resolve(__dirname,'../templates/views');
const partialsPath = path.resolve(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));//added to fix MIME CSS issue and image loading issue

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Swapnil B'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        comment:'Let\'s help each other',
        name:'Swapnil B'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Swapnil B',
        errorMessage:'Help article not found'
    })
});

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Swapnil B'
    })
})

app.get('/products', (req, res)=>{
    console.log(req.query);
    res.send({
        product:[]
    })
})

app.get('/weather', (req, res) => {
    if(req.query.address){

        geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            else{
                forecast(latitude, longitude, (err, forecastData)=>{
                    if(err){
                        return res.send({
                            error:err
                        })
                    }
                    else{
                        return res.send({
                            forecast:forecastData,
                            location: req.query.address,
                            placeName
                        })
                    }
                })
            }
        })

    }
    else{
        return res.send({error:'Address is missing!'})
    }
});

app.get('/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Swapnil B',
        errorMessage:'404 not found.'
    });
})

app.listen(port, () =>{
    console.error("Listening on port "+port);
})