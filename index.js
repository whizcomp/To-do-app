const express = require('express');

const app = express();
require('./startup/logging')();
require('./startup/routes')(app)
require('./startup/db')();

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`listening on port ${port}`));