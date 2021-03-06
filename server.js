const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engin', 'hbs');




app.use((req, res, next) => {
  var now = new Date().toString();
  log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n')
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'projects page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handel your request'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
