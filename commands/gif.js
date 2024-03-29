module.exports = {
    name: 'gif',
    description: 'Gets a gif from tenor',
    category: 'fun',
    execute(message, args) {
        var query = args.join(' ');
        fetch(`https://api.tenor.com/v1/random?q=${query}&key=` + process.env.TENOR)
            .then(res => res.json())
            .then(json => message.channel.send(json.results[0].url))
            .catch(e => {
                message.channel.send('Failed to find a gif that matched your query');
                return;
            });
    }
}