const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    coins: { type: Number, default: 5000, min: 0 },
    bank: { type: Number, default: 0, min: 0 },
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;