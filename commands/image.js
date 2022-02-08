var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: 'image',
    aliases: ['img'],
    description: 'scrapes an image outta google',
    cooldowns: 10,
    async execute(message, args, client, Discord, ProfileData, user, userQuery, master) {
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please enter an image name');

        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url)
    }
}