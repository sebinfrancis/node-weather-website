const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Sebin F"
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Sebin F"
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMessage: "This is a Help Page!!",
        title: "Help",
        name: "Sebin F"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
        return;
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found.",
        title: "404",
        name: "Sebin F"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page not found.",
        title: "Help",
        name: "Sebin F"
    })

});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});