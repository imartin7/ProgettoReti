const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());

const routes = require('./src/routes/routes');

app.use(express.json());
app.use(routes);


app.listen(9898, () => {
  console.log('Server running!');
});