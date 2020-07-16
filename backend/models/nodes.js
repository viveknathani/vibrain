const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const COLL_NODES = 'nodes';

function insertNode(graphName, node)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.collection(COLL_NODES).insertOne(node, function(err, res)
        {
            if(err) throw err.message;
            console.log('Node is inserted');
            client.close();
        });
    });
}

function getAllNodes(graphName, allContent)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        allContent = db.collection(COLL_NODES).find({}).toArray();
        client.close();
    });
}

function updateNode(graphName, node, newNode)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        let currentNode = {_id: node._id};
        db.collection(COLL_NODES).update(currentNode, newNode, function(err, res)
        {
            if(err) throw err.message;
            console.log('Node is updated.');
            client.close();
        });
    });
}

function deleteNode(graphName, node)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.collection(COLL_NODES).deleteOne(node, function(err, res)
        {
            if(err) throw err.message;
            console.log('Node is deleted.');
            client.close();
        });
    });
}

module.exports = {
    insertNode: insertNode,
    getAllNodes: getAllNodes,
    updateNode: updateNode,
    deleteNode: deleteNode
};
