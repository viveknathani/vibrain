/*
    Schema for "nodes" in the database.
    A node contains a string that can represent
    absolutely anything.
*/

const mongoose = require('mongoose');

const node = mongoose.Schema(
{
    thought: String
});
    
module.exports = mongoose.model('node', node);
