//Creating the Discord-Connection
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");
const noChannelRoles = ["@everyone", "admin", "fachschaft"];

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

    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    if (message.content === "" || message.content == undefined || message.channel.id != channelID || message.author.id == client.user.id) return;

    //puts the content of message in args, cutting prefix out
    const args = message.content.slice(config.prefix.length).split(' ');
    //puts the first argument of arg into command
    const command = args.shift().toUpperCase();

    //Commands
    switch (command) {

        case 'HELP':       //Sends the user all commands
            message.channel.send(`${message.author} "Needs to be done"`);
            break;

        case 'ADD': //Adds a new role to a user
            if (args[0] === "" || args[0] === undefined) {
                message.channel.send("Missing argument. Correct command: mi!add [toAdd]");
                return;
            }
            let role = message.channel.guild.roles.find(val => val.name === args[0]); //Searches for the role

            if (role === null) { //Couldn't find a role
                message.channel.send("Couldn't find a role with the name " + args[0]);
                return;
            }

            //Found a role with the given name and adds it to the member
            message.member.addRole(role.id);
            message.channel.send("You now have access to the channel " + role.name);
            return;

        case 'LIST': //Sends all available roles

            //Removes specific roles like admin
            let availableRoles = message.channel.guild.roles.filter(val => !noChannelRoles.includes(val.name, 0));

            //TODO filter doesnt quite work. wont remove the roles the user already has
            availableRoles.filter(val => !message.member.roles.filter(roleVal => roleVal.name !== val.name));


            if (availableRoles.array().length === 0) {
                message.channel.send("There are no available roles left!");
                return;
            }
            message.channel.send("Available roles: " + availableRoles.array().toString());
            return;
        default:            //Cannot identify any command
            message.channel.send("Wrong command! \r\nCheck \"mi!help\" for more information");
    }

});

client.on('error', error => {
    console.log(error.name);
    console.log(error.message);
});

function sendUserMessage(userId, message) {
    var s = client.users.get(userId);
    if (s === undefined) {
        Console.log("User is undefined!");
        return;
    }
    s.send(message);
}

client.login(config.token);
