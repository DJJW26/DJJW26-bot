module.exports = {
    name: 'stickyCaps',
    description: 'changes normal sentence to sticky caps',
    aliases: ['sc'],
    cooldowns: 2,
    category: 'fun',
    async execute(message, args) {
        let prefix = '%';
        let hm = null;
        if(message.content.includes("%sc ")){
            hm = message.content.replace('%sc ','');
        }
        else{
            hm = message.content.replace('%stickyCaps ','');
        }
        let args1 = hm.slice(prefix.length).split();

        for(let i = 0; i <= args1.length;i++){
            if(args1[i] == 'a'){
                args1[i]=='A';
            }
            else if(args1[i] == 'e'){
                args1[i]== 'E';
            }
            else if(args1[i] == 'i'){
                args1[i]=='I';
            }
            else if(args1[i] == 'l'){
                args1[i]== 'L';
            }
            else if(args1[i] == 'o'){
                args1[i]=='O';
            }
            else if(args1[i] == 'u'){
                args1[i]=='U';
            }
        }
        let sentence = args1.toString();
        message.reply(sentence);
    }
}