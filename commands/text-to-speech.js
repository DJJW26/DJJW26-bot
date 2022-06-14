const tts = require("discord-tts");
const { audioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, createAudioPlayer } = require("@discordjs/voice");
module.exports = {
  name: "tts",
  description: "talks for a user in vc",
  cooldown: 5,
  category: "utility",
  async execute(message, args, client, Discord, ProfileData, profileModel, user, userQuery, master) {
    const speech = args.shift();

    const stream = tts.getVoiceStream(speech);
    const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
    if (!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected) {
      var voiceConnection = joinVoiceChannel({
        channelId: message.member.voice.channelId,
        guildId: message.guildId,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
    }
    if (voiceConnection.status === VoiceConnectionStatus.Connected) {
      const player = createAudioPlayer()
      player.play(audioResource);
      //      voiceConnection.subscribe(audioPlayer);
      //      audioPlayer.play(audioResource);
    }
  }
}