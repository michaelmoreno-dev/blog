const express = require('express');
const app = express();
const PORT = 3000;
const Article = require("./models/Articles")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connectionasdf error:'));

db.once('open', function () {
  console.log("Successfully connected to MongoDB!");
});

app.use('/public', express.static('public'))
app.use(express.urlencoded({ extended: false }))

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