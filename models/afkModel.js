const { model, Schema } = require('mongoose');

module.exports = model('afk', new Schema({
    User: String,
    afk: {
        type: Object,
        default: {
            afk: false,
        },
    },
}));