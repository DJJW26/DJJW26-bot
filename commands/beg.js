const profileModel = require("../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  permissions: [],
  cooldown: 30,
  description: "beg for coins",
  category: 'economy',
  async execute(message) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} **coins**`);
  },
};