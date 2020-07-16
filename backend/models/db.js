const mongoClient = require('mongodb').MongoClient;
const nodeHandler = require('./nodes');
const linkHandler = require('./links');
const url = 'mongodb://localhost:27017/';
const DB_NAME = 'vibraindb';
const COLL_NODES = 'nodes';
const COLL_LINKS = 'links';
const GRAPHS_LIST = 'list';

function createGraph(graphName)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        console.log(`${graphName} database created.`);
        client.close();
    });

    mongoClient.connect(url, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.createCollection(COLL_NODES, function(err, res)
        {
            if(err) throw err.message;
            console.log('nodes collection created.');
            client.close();
        });
    });

    mongoClient.connect(url, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.createCollection(COLL_LINKS, function(err, res)
        {
            if(err) throw err.message;
            console.log('links collection created.');
            client.close();
        });
    });

    mongoClient.connect(url, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(DB_NAME);
        let dbObject = {name: graphName};
        db.collection(GRAPHS_LIST).insertOne(dbObject, function(err, res)
        {
            if(err) throw err.message;
            console.log('Updated vibraindb');
            client.close();
        });
    });
}

function deleteGraph(graphName)
{
    mongoClient.connect(url, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(DB_NAME);
        let dbObject = {name: graphName};
        db.collection(GRAPHS_LIST).deleteOne(dbObject, function(err, res)
        {
            if(err) throw err.message;
            console.log('Delete operation performed.');
            client.close();
        });
    });

    mongoClient.connect(url, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.dropDatabase(function(err, res)
        {
            if(err) throw err;
            console.log('Database dropped.');
        });
    });
}

module.exports = {
    createGraph: createGraph,
    deleteGraph: deleteGraph,
    insertNode: nodeHandler.insertNode,
    getAllNodes: nodeHandler.getAllNodes,
    updateNode: nodeHandler.updateNode,
    deleteNode: nodeHandler.deleteNode,
    insertLink: linkHandler.insertLink,
    getAllLinks: linkHandler.getAllLinks,
    deleteLink: linkHandler.deleteLink
}







