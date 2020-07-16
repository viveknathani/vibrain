const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const DB_NAME = 'vibraindb';
const COLL_NODES = 'nodes';
const COLL_LINKS = 'links';

function insertNode(){};
function getAllNodes(){};
function updateNode(){};
function deleteNode(){};

module.exports = {
    insertNode: insertNode,
    getAllNodes: getAllNodes,
    updateNode: updateNode,
    deleteNode: deleteNode
};
