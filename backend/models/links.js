/*
    Schema for "links" in the database.
    This facilitates the connection of two nodes.
    The ids of two nodes are used to link them. 
*/

const mongoose = require('mongoose');

const link = mongoose.Schema(
{
    sourceId: mongoose.Types.ObjectId,
    targetId: mongoose.Types.ObjectId
});

module.exports = mongoose.model('link', link);
    