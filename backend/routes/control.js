const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app)
{
    app.get('/', function(req, res)
    {
        res.send('This is vibrain.');
    });
}