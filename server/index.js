const express = require('express');
const cors    = require('cors');
const app     = express();
require("dotenv").config();

app.use(cors());

const routes = require('./src/routes/routes');

app.use(express.json());
app.use(routes);

const PORT = process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
  console.log('Server running in port', PORT);
});