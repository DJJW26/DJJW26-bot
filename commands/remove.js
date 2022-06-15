const profileModel = require("../models/profileSchema");
module.exports = {
  name: "remove",
  description: "removes some coins from a player",
  category: "dev",
  async execute(message, args, client) {
    if (!client.trusted.includes(message.author.id)) return;
    if (!args.length) return message.channel.send("You need to mention a player");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist");

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist in the db`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );

      return message.channel.send(`This player's ${amount} coins have been removed`);
    } catch (err) {
      console.log(err);
    }
  },
};