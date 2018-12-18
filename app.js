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
    let roleToChange;
    //Commands
    switch (command) {

        case 'HELP':       //Sends the user all commands
            handleHelp(message, args);
            break;

        case 'ADD': //Adds a new role to a user
            handleAdd(message, args);
            break;

        case 'REM': //removing a role
            handleRemove(message, args);
            break;


        case 'LISTREMOVE': //Lists all removable roles for this user
            handleListRemove(message, args);
            break;

        case 'LISTADD': //Sends all available roles
            handleListAdd(message, args);
            return;
        default:            //Cannot identify any command
            message.channel.send("Wrong command! \r\nCheck \"mi!help\" for more information");
    }

});

client.on('error', error => {
    console.log(error.name);
    console.log(error.message);
});


async function handleHelp(message, args) {
    message.channel.send(`${message.author} "Needs to be done"`);
}

async function handleAdd(message, args) {
    if (args[0] === "" || args[0] === undefined) {
        message.channel.send("Missing argument. Correct command: mi!add [toAdd]");
        return;
    }

    if (args[0].startsWith("@")) args[0] = args[0].substring(1, args[0].length);

    roleToChange = message.channel.guild.roles.find(val => val.name === args[0]); //Searches for the role

    if (roleToChange === null) { //Couldn't find a role
        message.channel.send("Couldn't find a role with the name " + args[0]);
        return;
    }

    //Found a role with the given name and adds it to the member
    message.member.addRole(roleToChange.id);
    message.channel.send("You now have access to the channel " + roleToChange.name);
}

async function handleRemove(message, args) {

    //Checking if argument is empty
    if (args[0] === "" || args[0] === undefined) {
        message.channel.send("Missing argument. Correct command mi!rem [toRemove]");
    }

    //Removing '@'
    if (args[0].startsWith("@")) args[0] = args[0].substring(1, args[0].length);

    //Checks if the user has the given role, so he could remove it
    roleToChange = message.member.roles.find(val => val.name === args[0]);

    //The user doesn't have the role
    if (roleToChange === null) {
        message.channel.send("Couldn't find a role with that name " + args[0]);
        return;
    }

    //Found a role with the given name and removes it from the member
    message.member.removeRole(roleToChange.id);
    message.channel.send("The role is now removed!");
}

async function handleListRemove(message, args) {
    //Removes specific roles like admin, everyone
    let removableRoles = message.member.roles.filter(role => !noChannelRoles.includes(role.name, 0)).array();

    //Checks if there is a role the user can remove
    if (removableRoles.length === 0) {
        message.channel.send("There is no role able to be removed!");
    } else
        message.channel.send("Removable roles: " + removableRoles.toString());
}

async function handleListAdd(message, args) {
    //Removes specific roles like admin
    let availableRoles = message.channel.guild.roles.filter(val => !noChannelRoles.includes(val.name, 0));

    //Removes roles the member already has
    availableRoles = availableRoles.filter(val => !message.member.roles.array().includes(val));

    //availableRoles = availableRoles.map(x => x.name);

    if (availableRoles.array().length === 0) {
        message.channel.send("There are no available roles left!");
        return;
    }

    message.channel.send("Available roles: " + availableRoles.array().toString());
}


function sendUserMessage(userId, message) {
    var s = client.users.get(userId);
    if (s === undefined) {
        Console.log("User is undefined!");
        return;
    }
    s.send(message);
}

client.login(config.token);
