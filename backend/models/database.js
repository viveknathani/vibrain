/*
    Connect to vibraindb and enable magic!
*/

const mongoose = require('mongoose');
const mongoServerPath = 'mongodb://localhost:27017/vibraindb';

function establishConnection()
{
    mongoose.connect(mongoServerPath,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to the database.'))
    .catch(err => console.log('Database connection error.'));
}

module.exports = { establishConnection: establishConnection };
