
//Creating the Discord-Connection
const Discord = require('discord.js');
const client = new Discord.Client();

//Channel ID needs to be changed to the channel ID he only should listen to
const channelID = 518532018573803550;

client.on('ready', () => {
    console.log("Bot ist ready!")
});

//New User joins on the Server
client.on('guildMemberAdd', member => {
    member.sendMessage("Willkommen auf unserem Informatik Discord Server!");

});

//Responding
client.on('message', message => {
    if (message.content === "" || message.content == undefined || message.channel.id != channelID || message.author.id == client.user.id) return;  
    var splitted = message.content.split(" ");

    //Commands
    switch (splitted[0].toUpperCase()) {           
       
        case '!HELP':       //Sends the user all commands
            message.sendMessage(message.author, "!Email [EmailAddress] - Set your Email (Only for authentification purposes)");
            break;

        case '!LIST': //Sends all channels
           // message.guild.map(new function();

        default:            //Cannot identify any command
            if (message.content.startsWith("!"))
                message.reply("Wrong command! \r\nCheck \"!help\" for more information");
    }

});

client.on('error', error => {
    console.log(error.name);
    console.log(error.message);
})

function sendUserMessage(userId, message) {
    var s = client.users.get(userId);
    if (s === undefined) {
        Console.log("User is undefined!");
        return;
    }
    s.send(message);
}

//INSERT BOT Auth. Token
client.login('');