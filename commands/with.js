const profileModel = require("../models/profileSchema");
module.exports = {
    name: "with",
    aliases: ["withdraw"],
    permissions: [],
    description: "Withdraw coins from your bank!",
    async execute(message, args, client, Discord, ProfileData, user, userQuery) {
        let amount = args[0]
        let resultBank
        if (amount == 'all'){

        }
        else if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdrawn amount must be a whole number");
        if (typeof amount === 'Number') {
            if (amount % 1 != 0 || amount <= 0) return message.channel.send("withdrawn amount must be a whole number");
            if (amount > ProfileData.coins) {
                message.channel.send(`You don't have that amount of coins to withdraw`);
            }
        }
        if ( amount === 'all'){
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