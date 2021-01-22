const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./config/routes')
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)
app.listen(port, () => console.log(`listening at http://localhost:${port}`))




