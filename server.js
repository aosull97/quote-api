const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.listen(PORT);

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes)
  console.log({quote: randomQuote});
  res.send({quote: randomQuote});
})

app.get('/api/quotes', (req, res) => {
  const authorSearch = req.query.person;
  const filteredByAuthor = quotes.filter((author) => {
    return author.person === authorSearch});
  if(authorSearch){
    res.send({quotes: filteredByAuthor})
  } else {
  res.send({quotes: quotes})
  }
})

app.post('/api/quotes', (req, res) => {
  const newQuote = req.query.quote;
  const newAuthor = req.query.person;
  if(newQuote != '' && newAuthor != ''){
    quotes.push({ quote: newQuote, person: newAuthor });
    res.send({ quote: { quote: newQuote, person: newAuthor } });
  } else {
    res.sendStatus(400);
  }
})

