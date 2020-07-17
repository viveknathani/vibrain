const bodyParser = require('body-parser');
const databaseHandler = require('../models/database');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const graphModel = require('../models/graph');

module.exports = function(app)
{
    databaseHandler.establishConnection();

    app.get('/', function(req, res)
    {
        res.send('This is vibrain\'s backend');
    });

    app.get('/api/graphs', async function(req, res)
    {
        try 
        {
            let all;
            await graphModel.find()
                .then(docs => all = JSON.stringify(docs))
                .catch(err => console.error(err));         
            res.send(all);
        }
        catch(err) 
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.post('/api/graphs/:graph_name', async function(req, res)
    {
        try 
        {
            let creator = new graphModel({ name: req.params.graph_name });
            await creator.save();
            res.send('Created');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.delete('/api/graphs/:graph_name', async function(req, res)
    {
        try 
        {
            await graphModel.findOneAndRemove({name: req.params.graph_name});
            res.send('Deleted');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

}