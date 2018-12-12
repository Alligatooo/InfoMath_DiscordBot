
//Creating the Discord-Connection
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

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
client.on('message', async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(config.prefix) !== 0) return;

    if (message.content === "" || message.content == undefined || message.channel.id != channelID || message.author.id == client.user.id) return;
    var splitted = message.content.split(" ");
    splitted[0] = splitted[0].substr(config.prefix.length);

    //Commands
    switch (splitted[0].toUpperCase()) {

        case 'HELP':       //Sends the user all commands
            message.channel.send(`${message.author} "Needs to be done"`);
            break;

        case 'ADD': //Adds a new role to a user
            if (splitted[1] === "" || splitted[1] === undefined) return;
            let role = message.channel.guild.roles.find(val => val.name === splitted[1]); //Searches for the role

            if (role === null) { //Couldn't find a role
                message.channel.send("Couldn't find a role with the name "+ splitted[1]);
                return;
            }

            //Found a role with the given name and adds it to the member
            message.member.addRole(role.id);
            message.channel.send("You now have access to the channel "+ role.name);
            return;

        case 'LIST': //Sends all channels
            message.channel.send("something");
        // message.guild.map(new function();
        default:            //Cannot identify any command
            if (message.content.startsWith("!"))
                message.channel.send("Wrong command! \r\nCheck \"!help\" for more information");
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

client.login(config.token);
