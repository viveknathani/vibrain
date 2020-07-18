/*
    This module contains the handling of different 
    HTTP requests. It is essentially the crux of this 
    web application. Callbacks of requests that need 
    a database operation are wrapped up in an aysnc
    -await format. Database operations are handled 
    by the mongoose API. Refer to https://mongoosejs.com/docs/api.html 
    for more.
    Author : Vivek Nathani 
    Year : 2020
*/

// Declaration of requirements.
const bodyParser = require('body-parser');
const databaseHandler = require('../models/database');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const graphModel = require('../models/graph');
const nodesModel = require('../models/nodes');
const linksModel = require('../models/links');

// Contract between the backend and frontend.
module.exports = function(app)
{
    app.use(bodyParser.json());
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
            res.send('Created!!');
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    });

    app.post('/api/node/:graph_name', async function(req, res)
    {
        try
        {
            let myObject = new nodesModel({thought: req.body.thought});
            console.log(myObject);
            await graphModel.updateOne({name:req.params.graph_name}, {$push: {nodes: myObject}});
            res.send('Created');
        }
        catch(err) 
        {
            console.log(err);
        }
    });

    app.post('/api/update_node/:graph_name', async function(req, res)
    {
        try
        {
            let ID = ObjectId(req.body._id);
            console.log(`Object :  ${ID}`);
            let str = String(req.body.thought);
            console.log(str);
            await graphModel.updateOne({name:req.params.graph_name, 'nodes._id': ID}, { 'nodes.$.thought': str });
            res.send('Updated');
        }
        catch(err)
        {
            console.log(err);
        }
    });

    app.post('/api/link/:graph_name', async function(req, res)
    {
        try
        {
            let ID1 = ObjectId(req.body._id1);
            let ID2 = ObjectId(req.body._id2);
            let linkObject = new linksModel({sourceId: ID1, targetId: ID2});
            await graphModel.updateOne({name:req.params.graph_name}, {$push: {links: linkObject}});
            res.send('Created');
        }
        catch(err)
        {
            console.log(err);
        }
    });

    app.delete('/api/link/:graph_name', async function(req, res)
    {
        try
        {
            let ID1 = ObjectId(req.body._id1);
            let ID2 = ObjectId(req.body._id2);
            await graphModel.updateOne({name:req.params.graph_name}, {$pull: {links: {sourceId: ID1, targetId: ID2}}});
            res.send('Deleted');
        }
        catch(err)
        {
            console.log(err);
        }
    });

    app.delete('/api/node/:graph_name', async function(req, res)
    {
        try 
        {
            let ID = ObjectId(req.body._id);
            console.log(`Object :  ${ID}`);
            await graphModel.updateOne({name:req.params.graph_name}, { $pull: { 'nodes': { '_id': ID } } });
            res.send('Deleted');
        }
        catch(err)
        {
            console.log(err);
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