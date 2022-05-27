const { model, Schema } = require('mongoose');

module.exports = model('remind', new Schema({
    User: String,
    Reminders: Object,
}))