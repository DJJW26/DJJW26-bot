const { model, Schema } = require('mongoose');

module.exports = model('highlight', new Schema({
    Word: String,
    Users: Array,
}));