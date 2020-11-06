const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Article = require("./models/Articles")
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'blog';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectionasdf error:'));
db.once('open', function () {
  console.log("Successfully connected to MongoDB!");
});

// MALWARE
app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index.ejs', { articles: [
    {
      title: 'test',
      content: 'test',
      date: Date.now(),
    },
    {
      title: 'test',
      content: 'test',
      date: Date.now(),
    },
    {
      title: 'test',
      content: 'test',
      date: Date.now(),
    },
  ]})
})

app.get('/new', (req, res) => {
  res.render('new.ejs')
})

app.post('/new', (req, res) => {
  console.log('triggered');
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  })
  res.redirect('/new')
})

app.listen(PORT, console.log('Listening on', PORT))