module.exports = {
    name: 'qr',
    aliases: ['qrcode', 'qr-code'],
    async execute(message, args, client, Discord) {
        const neb = args.join(' ');
        function isValidURL(string) {
            const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null);
        }
        if (isValidURL(neb) == true) {
            const url = `http://api.qrserver.com/v1/create-qr-code/?data=${neb}&size=100x100`;

            const embed = new Discord.MessageEmbed()
                .setColor('#E7A700')
                .setTitle('QR CODE')
                .setImage(url);
            await message.channel.send({embeds: [embed]});
        }
        else return message.reply("Please enter a valid url in the format http(s)://www.example.com");
    }
}