module.exports = {
    name: 'afk',
    description: 'do i rly need to write this?',
    async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master, afks){
        if(args.shift == null){
            afks.set(`<@${message.author.id}>`, '`AFK`');
            message.reply('i have set your afk as `AFK`');
        }
        else{
            afks.set(`<@${message.author.id}>`, `\`${args.shift}\``);
        }
    }
}