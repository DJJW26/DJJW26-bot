module.exports = {
    name: "sell",
    async execute(message, args, client, Discord, ProfileData, user, userQuery){
      let item = user.inventory.find(v => v.name === args[0].toLowerCase());
      if(!item){
        return message.channel.send("No Item Found In Inventory");
      }
  
      await ProfileData.updateOne(userQuery, {
        "$pull": {
          "inventory": item
        },
        "$inc": {
          coins: Math.round(item.cost * 2/3)
        }
      });
  
      await message.channel.send(`You sold ${item.name} and recieved ${Math.round(item.cost * 2/3)} coins.`)
  
    }
  }
  