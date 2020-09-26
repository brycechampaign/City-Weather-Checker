const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // Temporary, for development purposes. Will use environment variable later

app.use(express.static(path.join(__dirname, '../../dist')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
