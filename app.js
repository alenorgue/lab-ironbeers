const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const exphbs = require('express-handlebars');
const { title } = require('process');


const app = express();



const punkAPI = new PunkAPIWrapper();
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register layout.hbs as the main layout
defaultLayout = path.join(__dirname, 'views/layout/layout.hbs');

app.set('view options', { layout: defaultLayout });

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const response = await fetch('https://ih-beers-api2.herokuapp.com/beers');

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const beers = await response.json(); // se convierte manualmente
    res.render('beers', {
      title: 'Beer Catalog',
      beers
    });
  } catch (error) {
    console.error('Error al obtener cervezas:', error);
    res.status(500).send('Error al cargar las cervezas');
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const response = await fetch('https://ih-beers-api2.herokuapp.com/beers/random');
console.log(response);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const beer = await response.json(); // se convierte manualmente
    res.render('random-beer', {
        beer

    });
  } catch (error) {
    console.error('Error al obtener cerveza:', error);
    res.status(500).send('Error al cargar las cerveza');
  }
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
