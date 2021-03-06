const ms = require('ms')
const remindDb = require('../models/utilityModel');

module.exports = {
    name: 'remind',
    aliases: ['reminder', 'remindme', 'rm'],
    description: 'set a reminder for yourself',
    category: 'utility',
    async execute(message, args, client, Discord) {

        if (!args.length) return message.reply('Please provide valid arguements. Example: \`%rm 5m gotta clean the oven\`')

        if (args[0] == 'list') {
            await remindDb.findOne({ User: message.author.id }, async (err, data) => {
                if (!data) return await message.reply('You have no reminders');
                const mappedData = await Object.keys(data.Reminders).map((key) => {
                    return `Time: ${key}, Reminder: \`${data.Reminders[key]}\``
                }).join(' \n');

                message.channel.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`${message.author.username}'s reminders`)
                        .setDescription(`${mappedData}`)]
                });
            }).clone().catch(async (err) => { console.log(err) });
            return;
        }
        const time = args[0]
        if (!time) return message.reply('Please enter correct time');

        if (!ms(time)) return message.reply('Please enter a valid time');

        const milli = ms(time);

        args.shift()

        let reminder = args.join(' ');

        if (!reminder) return message.reply('Please give a valid reminder');

        await remindDb.findOne({ User: message.author.id }, async (err, data) => {
            if (data) {
                data.Reminders[time] = `${reminder}`
                await remindDb.findOneAndUpdate({ User: message.author.id }, data);
            } else {
                new remindDb({
                    User: message.author.id,
                    Reminders: {
                        [time]: `${reminder}`
                    }
                }).save()
            }
        }).clone().catch(async (err) => { console.log(err) });

        setTimeout(() => {
            message.author.send(`You asked me to remind you about \`${reminder}\`, ${time} ago.`)
            remindDb.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    delete data.Reminders[time];
                    remindDb.findOneAndUpdate({ User: message.author.id }, data);
                }
            }).clone().catch(async (err) => { console.log(err) });
        }, milli);

        message.channel.send(`Alright <@${message.author.id}>, i'll remind you about \`${reminder}\`, in ${time}`);
    }
}