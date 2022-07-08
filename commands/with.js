const profileModel = require("../models/currencyModel");
module.exports = {
    name: "with",
    aliases: ["withdraw"],
    description: "Withdraw coins from your bank!",
    category: "economy",
    async execute(message, args) {
        var ProfileData = profileModel.findOne({ userID: message.author.id });
        if (!ProfileData) {
            new profileModel({
                userID: message.author.id,
                coins: 5000,
                bank: 0,
            }).save();
        }
        ProfileData = profileModel.findOne({ userID: message.author.id });
        let amount = args[0]
        let resultBank
        if (amount == 'all') {

        }
        else if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdrawn amount must be a whole number");
        if (typeof amount === 'Number') {
            if (amount % 1 != 0 || amount <= 0) return message.channel.send("withdrawn amount must be a whole number");
            if (amount > ProfileData.coins) {
                message.channel.send(`You don't have that amount of coins to withdraw`);
            }
        }
        if (amount === 'all') {
            resultBank = ProfileData.bank - ProfileData.coins
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: ProfileData.coins,
                        bank: -ProfileData.coins,
                    },
                }
            );
            message.channel.send(`You withdrew ${amount} coins from your bank, current bank balance is ${resultBank}`);
        }
        else {
            amount = parseInt(args[0])
            resultBank = amount - ProfileData.bank
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: amount,
                        bank: -amount,
                    },
                }
            );
            return message.channel.send(`You withdrew ${amount} coins from your bank, current bank balance is ${resultBank}`);
        }
    },
};