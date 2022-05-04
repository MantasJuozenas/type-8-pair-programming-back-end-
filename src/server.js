const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConfig } = require('./config');

console.log('dbConfig ===', dbConfig);
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'page not found' });
});

app.listen(dbConfig.port, () => console.log('serveris veikia', dbConfig.port));
