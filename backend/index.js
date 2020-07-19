const express = require('express');
const paths = require('./api/control');
const port = 4000;
const cors = require('cors');
const app = express();
app.use(cors());
paths(app);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}/`));