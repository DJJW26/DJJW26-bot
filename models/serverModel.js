const {model, Schema} = require('mongoose');

module.exports = model('server', new Schema({
    Guild: String,
    Tags: Object,
    MuteRole: String,
    GiveawayBypassRole: String,
    isSnipeEnabled: {
        type: Boolean,
        default: false,
    },
    isCensorEnabled: {
        type: Boolean,
        default: false,
    },
    censors: Array
}));