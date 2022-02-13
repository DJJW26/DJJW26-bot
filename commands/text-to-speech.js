const tts = require('google-tts-api');
const download = require('download');
const { Readable } = require('stream');

module.exports = {
  name: "tts",
  group: "voice",
  description: "talks for a user in vc",
  cooldown: 0,
  settings: {
    baseAudio: 2
  },
  /**
   * @param {import('discord.js').Message} message the message that was recieved
   * @param {string[]} args the inputted arguments
   */
  async execute(message, args) {
    let vc = message.member.voice.channel;
    if (!vc) return message.channel.send('your not in a vc.');
    if(!vc.members.has(message.client.user.id) && message.guild.me.voice.connection) await vc.join();


    let Lang = args.shift();

    let urls = tts.getAllAudioUrls(args.join(' '), {
      lang: Lang,
      slow: false
    }).map(val => val.url);

    let options = {
      seek: 0,
      volume: this.settings.baseAudio
    };

    for (let url of urls){
      await new Promise(async (resolve, reject) => {
        let audio = Readable.from(await download(url));

        const stream = message.guild.me.voice.connection.play(audio, options);

        stream.on('finish', () => {
          stream.end();
          delete audio, stream;
          resolve();
        });
      })
    }
  }
}
