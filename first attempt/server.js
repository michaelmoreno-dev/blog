const express = require('express');
const app = express();
const PORT = 3000;
const Article = require('./models/article');
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))


app.get('/', async (req, res) => {
  const articles = await Article.find().sort({createdAt: 'desc'});
  res.render('articles/index.ejs', { articles: articles });
})

app.listen(PORT, console.log('Listening on', PORT));
app.use('/articles', articleRouter)