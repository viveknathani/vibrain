const mongoose = require('mongoose');
const nodeSchema = require('./nodes').schema;
const linkSchema = require('./links').schema;

const graph = mongoose.Schema(
{
    name: String,
    nodes: [nodeSchema],
    links: [linkSchema]
});

module.exports = mongoose.model('Graph', graph);

