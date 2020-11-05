const express = require('express');
const app = express();
const PORT = 3000;

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(PORT, console.log('Listening on', PORT))