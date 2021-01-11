const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(                      //this method to connect to database
      'mongodb+srv://volha:Business+1@cluster0.w9v6w.mongodb.net/todos',
      {
      useNewUrlParser: true,
      useFindAndModify: false
    })
  } catch(e) {
    console.log(e)
  }
}

app.listen(PORT, () => {                  //for server running
  console.log('Server has been started...')
});

start();
