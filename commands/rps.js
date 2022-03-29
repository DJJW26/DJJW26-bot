const { MessageEmbed } = require('discord.js');
const { MessageActionRow } = require('discord.js');
const { MessageButton } = require('discord.js');
module.exports = {
    name: 'rps',
    description: 'Rock Paper Scissors.',
    async execute(message, args, client) {
        let hand = [{ txt: 'Rock', emoji: '✊', index: 0 }, { txt: 'Paper', emoji: '🤚', index: 1 }, { txt: 'Scissors', emoji: '✌️', index: 2 }]; // Defining Moves
        let botMove = hand[Math.floor(Math.random() * 3)]; 

        let rpsMsg = await message.channel.send({
            embeds: [
                new MessageEmbed() 
                    .setColor('RANDOM')
                    .setTitle('Rock Paper Scissors')
                    .setDescription('Choose a handsign')
            ],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`rps_rock`)
                            .setLabel("✊ Rock")
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId(`rps_paper`)
                            .setLabel("🤚 Paper")
                            .setStyle('PRIMARY'),
                        new MessageButton()
                            .setCustomId(`rps_scissors`)
                            .setLabel("✌️ Scissors")
                            .setStyle('PRIMARY')
                    )
            ]
        });

        let win = 0; 
        let userMove;
        
        
        let f = async (interaction) => {
            if (!interaction.isButton()) return; 
            if (interaction.customId.startsWith('rps')) {
                await interaction.deferUpdate() 
                let move = interaction.customId.split('_')[1]
                userMove = hand.find(v => v.txt.toLowerCase() == move)
                switch (move) { 
                    case 'rock':
                        win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2); break;
                    case 'paper':
                        win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0); break;
                    case 'scissors':
                        win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1); break;
                }

                let embed = rpsMsg.embeds[0];
                embed.description = `I chose ${botMove.txt}! ${win == 0 ? 'You lost!' : (win == 1 ? 'We tied!' : 'You win!')} (${userMove.emoji} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji})`;
                
                let components = rpsMsg.components
                components[0].components.forEach(comp => {
                    if (comp.customId == interaction.customId) { comp.disabled = true; comp.style = 'SECONDARY' }
                    else comp.disabled = true
                })
                
                interaction.message.edit({ embeds: [embed], components: components })
                
                client.off('interactionCreate', f)
            }
        }

        client.on('interactionCreate', f)
    }
}