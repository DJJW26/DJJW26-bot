const {model, Schema} = require('mongoose');

module.exports = model('currency', new Schema({
    User: String,
    coins: {
        type: Number,
        default: 5000,
    },
    bank: {
        type: Number,
        default: 0,
    },
    Inventory: {
        type: Object,
        default: {},
    },
    DailyStreak: {
        type: Number,
        default: 0,
    },
    DailyStreakTime: {
        type: Date,
        default: null,
    },
    Deaths: {
        type: Number,
        default: 0,
    },
    Prestige: {
        type: Number,
        default: 0,
    },
}));