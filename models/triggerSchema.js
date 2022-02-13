const { Schema, model } = require('mongoose');

let schema = new Schema({
    guild: String,
    triggers: Array
})

module.exports = model('trigger', schema)