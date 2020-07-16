const express = require('express');
const paths = require('./routes/control');
const port = 4000;
const app = express();
paths(app);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}/`));