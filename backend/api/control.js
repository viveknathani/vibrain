const bodyParser = require('body-parser');
const databaseHandler = require('../models/db');
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app)
{
    app.get('/', function(req, res)
    {
        res.send('This is vibrain.');
    });

    app.get('/about', function(req, res)
    {
        res.send('About.');
    });

    app.get('/workspace', function(req, res)
    {
        res.redirect('/');
    });
}