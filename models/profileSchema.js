const mongoose = require('mongoose');

let Item = new mongoose.Schema({
    name: { type: String, required: true },
    aliases: { type: Array, default: [] },
    description: String,
    cost: { type: Number, required: true },
});


let profileSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    coins: { type: Number, default: 5000, min: 0 },
    bank: { type: Number, default: 0, min: 0 },
    inventory: [Item]
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;