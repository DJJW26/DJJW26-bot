require('dotenv').config();
const cooldown = require('../../models/cooldownSchema.js')
const Discord = require('discord.js');

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let ProfileData;
    const profileModel = require(`../../models/profileSchema`)
    try {
        ProfileData = await profileModel.findOne({ userID: message.author.id })
        if (!ProfileData) {
            let Item = await profileModel.create({
                name: { type: String, required: true },
                aliases: { type: Array, default: [] },
                description: String,
                cost: { type: Number, required: true },
            });


            let profile = await profileModel.create({
                userID: { type: String, required: true },
                coins: { type: Number, default: 5000, min: 0 },
                bank: { type: Number, default: 0, min: 0 },
                inventory: [Item]
            })
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const master = ['869768645067292693', '928895679043080192'];

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command?.permissions?.length) {
        let invalidPerms = []
        for (const perm of command.permissions) {
            if (!validPermissions.includes(perm)) {
                return console.log(`Invalid Permissions ${perm}`);
            }
            if (!message.member.permissions.has(perm)) {
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }
    let userQuery = { userID: message.author.id }

    let user = await profileModel.findOne(userQuery);

    if (!user) {
        let new_user = new profileModel(userQuery)
        await new_user.save();
        user = await profileModel.findOne(userQuery);
    };

    const afks = new Map();

    if (afks.has(`<@${message.author.id}>`)) {
        message.reply('Welcome back! I have removed your afk.');
        afks.delete(`<@${message.author.id}>`);
    }
    if (!message.mentions.users.size) { }
    else {
        if (afks.has(`<@${message.mentions.users.first().id}>`)) {
            message.reply(`That person is afk, they have left this message for you: ${afks.get(`<@${message.mentions.users.first().id}>`)}`);
        }
    }
    async function commandExecute() {
        if (command) command.execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master, afks);
    }

    if (command) {
        if (command.cooldown) {
            const current_time = Date.now();
            const cooldown_amount = (command.cooldown) * 1000

            cooldown.findOne({ userId: message.author.id, cmd: command.name }, async (err, data) => {
                if (data) {
                    const expiration_time = data.time + cooldown_amount;

                    if (current_time < expiration_time) {
                        const time_left = (expiration_time - current_time) / 1000

                        if (time_left.toFixed(1) >= 3600) {
                            let hour = (time_left.toFixed(1) / 3600);
                            return message.reply(`Please wait ${parseInt(hour)} more hours before using \`${command.name}\`!`)
                        }
                        if (time_left.toFixed(1) >= 60) {
                            let minute = (time_left.toFixed(1) / 60);
                            return message.reply(`Please wait ${parseInt(minute)} more minutes before using \`${command.name}\`!`)
                        }
                        let seconds = (time_left.toFixed(1));
                        return message.reply(`Please wait ${parseInt(seconds)} more seconds before using \`${command.name}\`!`)
                    } else {
                        await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                        commandExecute();
                    }
                } else {
                    commandExecute();
                    new cooldown({
                        userId: message.author.id,
                        cmd: command.name,
                        time: current_time,
                        cooldown: command.cooldown,
                    }).save();
                }
            })
        } else {
            commandExecute();
        };
    }
    else {

    }
}