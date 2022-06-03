const { model, Schema } = require('mongoose');

module.exports = model('tag', new Schema({
    Guild: String,
    Tags: Object,
}));