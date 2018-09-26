const fs = require("fs");
const express = require("express");
const hbs = require('hbs');
const port = process.env.PORT || 3000;  
var app = express();

hbs.registerPartials(__dirname + "/views/partials")

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.set('view engine', 'hbs');
app.use(express.static(__dirname));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

        welcomeMessage: 'This is about ABOUT Page'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website"'
    });
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.error(err);
    });
    next();
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to Handle Request"
    })
});

app.listen(3000, () => {
    console.log(`Starting server at ${port}`);
});