const schema = require('../models/triggerschema');
module.exports = {
    name : 'trigger',
    description: 'Add a trigger',

    execute : async(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) => {
        schema.findOne({ guild: message.guild.id }, async(err, data) => {
            if(!args[0]) {
                if(!data || !data.triggers) return message.reply('There are no triggers yet!')
                
                message.channel.send(
                    new MessageEmbed()
                    .setTitle(`Triggers`)
                    .setDescription(`This server's triggers are: ${data.triggers.map((prop, index) => `\`${prop.trigger};${prop.response}\``)}`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RANDOM')
                )
                return;
            }

            let AddRemove = args.shift().toLowerCase();
            
            if(!args.join(' ').includes(';')) return message.reply(`You must include a ; to signify the trigger and the response!`)
            const arg = message.content.trim().slice(client.prefix.length + 7 + AddRemove.length).trim().split(';');
            if(!arg[0]) return message.reply(`You must enter a trigger!`)
            let trigger = arg[0].slice(1).toLowerCase().trim();
    
            if(AddRemove == 'add') {
                if(!arg[1]) return message.reply('You must enter a response!')
                let response = arg[1].toLowerCase().trim();

                if(!data) {
                    data = new schema({
                        guild: message.guild.id,
                        triggers: {
                            trigger: trigger,
                            response: response,
                        }
                    })
                } else {
                    let arr = [];
                    data.triggers.map((i) => {
                        arr.push(i.trigger)
                    })
                    if(arr.includes(trigger)) return message.reply(`That's already a trigger!`)

                    data.triggers.push({ trigger: trigger, response: response });
                }
                data.save().then(message.channel.send(
                    new MessageEmbed()
                    .setTitle(`Trigger Succesfully Added`)
                    .setDescription(`${message.author.tag} succesfully added a trigger\nTrigger: \`${arg[0].slice(1).trim()}\`\nResponse: \`${arg[1].trim()}\``)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('GREEN')
                ))
            } else if(AddRemove == 'remove') {
                if(!data) {
                    return message.reply(`There aren't any triggers yet!`)
                } else {
                    let arr = [];
                    data.triggers.map((i) => {
                        arr.push(i.trigger)
                    })
                    if(!arr.includes(trigger)) return message.reply(`That isn't a trigger!`)

                    let filter = data.triggers.filter(e => e.trigger !== trigger);
                    data.triggers = filter
                }
                
                data.save().then(message.channel.send(
                    new MessageEmbed()
                    .setTitle(`Trigger Succesfully Removed`)
                    .setDescription(`${message.author.tag} has removed a trigger\nTrigger: \`${arg[0].slice(1).trim()}\``)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RED')
                ))
            } else {
                return message.reply(`You must either state add or remove!`)
            }
        })
    }
}