const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConfig } = require('./config');
const creatingDb = require('./routes/creatingDb');
const petsRoutes = require('./routes/petsRoutes');
const medicationsRoutes = require('./routes/medicationsRoutes');
const logsRoutes = require('./routes/logsRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/v1', creatingDb);
app.use('/v1', petsRoutes);
app.use('/v1', medicationsRoutes);
app.use('/v1', logsRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'page not found' });
});

app.listen(dbConfig.port, () => console.log('serveris veikia', +dbConfig.port));
