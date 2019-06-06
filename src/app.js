const path = require('path');
const chalk = require('chalk');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths definition
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * Make express use handlebars as tempating engine.
 */
app.set('view engine', 'hbs');

/**
 * Change default handlebars views location to custom location (default is views under root)
 */
app.set('views', viewsPath);

/**
 * Tell hbs where partials live.
 */
hbs.registerPartials(partialsPath);

/**
 * Registers static files to be served.
 */
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jellis Torfs'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jellis Torfs'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Please help me :(',
        name: 'Jellis Torfs'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address in the querystring.'
        })
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error });
        }
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            return res.send({
                forecast: forecastData,
                location: geoData.location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Jellis Torfs'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Jellis Torfs'
    });
});

app.listen(3000, () => console.log(chalk.green('Server running on port 3000.')));