const {createWorker} = require('tesseract.js');
module.exports = {
    name: 'ocr',
    aliases: ['image-to-text', 'itt'],
    description: 'OCR a image',
    category: 'utility',
    async execute(message, args, client, Discord){
        const img = message.attachments.first();
        if(!img) return message.reply('Please provide an image.')

        try {
            const worker = createWorker();
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {
                data: { text },
            } =  await worker.recognize(img.url);
            await worker.terminate()
            message.reply(text)
        } catch (e) {
            console.log(e);
        }
    }
}