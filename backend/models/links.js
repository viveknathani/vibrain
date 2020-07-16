const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const COLL_LINKS = 'links';

function insertLink(graphName, link)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.collection(COLL_LINKS).insertOne(link, function(err, res)
        {
            if(err) throw err.message;
            console.log('Node is inserted');
            client.close();
        });
    });
}

function getAllLinks(graphName, allContent)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        allContent = db.collection(COLL_LINKS).find({}).toArray();
        client.close();
    });
}

function deleteLink(graphName, link)
{
    let creator = url + graphName;
    mongoClient.connect(creator, function(err, client)
    {
        if(err) throw err.message;
        let db = client.db(graphName);
        db.collection(COLL_LINKS).deleteOne(link, function(err, res)
        {
            if(err) throw err.message;
            console.log('Link is deleted.');
            client.close();
        });
    });
}

module.exports = {
    insertLink: insertLink,
    getAllLinks: getAllLinks,
    deleteLink: deleteLink
};
