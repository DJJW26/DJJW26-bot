module.exports = {
    name : 'scramble',
    description: 'Attempt to unscramble the given scrambled word',
    execute : async(message) => {
        let words = ['childhood', 'imagination', 'renaissance', 'ambulance', 'fluorescent', 'philosophical', 'vernacular', 'international', 'embarrassment', 'problematic' ];
        let word = words[parseInt(Math.random() * words.length)];
        let wrong = 0;
        let scrambled = word.split('');
    
        scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        while(scrambled.join('') == word) scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        message.channel.send(`Your word is... \`${scrambled.join('')}\`! Unscramble the given word. You have 3 lives, good luck!`);
        
        const filter = msg => msg.author.id == message.author.id;
        
        const collector = message.channel.createMessageCollector({ filter, time: 60000, max: 3 })

        collector.on('collect', async(msg) => {
            if(msg.content.toLowerCase() == word.toLowerCase()) return message.channel.send(`That's correct! Good job!`);
            else {
                message.channel.send(`That's incorrect`);
                wrong = wrong + 1;
            }
            if(wrong == 3){
                message.channel.send('You lost your 3 lives, you lose')
            }
        });

        collector.on('end', async(collected) => {
            if(collected.size == 0) message.channel.send(`You timed out! Try respond quicker next time.`);
        });
    }
};