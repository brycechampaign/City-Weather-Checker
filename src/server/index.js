const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
