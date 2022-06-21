const {model, Schema} = require('mongoose');

module.exports = model('utility', new Schema({
    User: String,
    afk: {
        type: Object,
        default: {
            afk: false,
        },
    },
    Reminders: Object,
    blocked: {
        type: Boolean,
        default: false,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    commandsRan: {
        type: Number,
        default: 0,
    }
}));