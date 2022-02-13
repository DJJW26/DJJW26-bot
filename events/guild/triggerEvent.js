const trigger = require('../../models/triggerschema');

module.exports = async(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) => {
    client.on('message', async (message) => {
        if (!message.guild || message.author.bot) return;
        trigger.findOne({ guild: message.guild.id }, async (err, data) => {
            if (!data || !data.triggers) return;
            if (message.content.startsWith(`${client.prefix}trigger`)) return;
            let arr = [];
            data.triggers.map(i => {
                arr.push(i.trigger);
            });
            for (let i in arr) {
                if (message.content.toLowerCase().includes(arr[i])) data.triggers.map((prop, index) => {
                    if (index == i) message.reply(prop.response)
                })
            }
        })
    })
}