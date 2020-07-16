const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const DB_NAME = 'vibraindb';
const COLL_NODES = 'nodes';
const COLL_LINKS = 'links';

function insertLink(){};
function getAllLinks(){};
function deleteLink(){};

module.exports = {
    insertLink: insertLink,
    getAllLinks: getAllLinks,
    deleteLink: deleteLink
};
