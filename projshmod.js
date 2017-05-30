const Discord = require('discord.js');
const client = new Discord.Client();

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("mod:" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log('Ready, type mod:ping to test')
});

client.on('message', message =>{
    var args = message.content.split(/[ ]+/);
    //mod:ping command
    if(commandIs("ping", message)){
        message.channel.send(':warning: PONG!');
    }
    //mod:pong command
    if(commandIs("pong", message)){
        message.channel.send(':warning: PING!');
    }
    //mod:test command
    if(commandIs("test", message)){
        message.channel.send('Hello world! :earth_americas:');
    }
    //mod:spam command
    if(commandIs("spam", message)){
        if(hasRole(message.member, "Admin") || hasRole(message.member, "Moderator") || hasRole(message.member, "Staff")){
            console.log('A staff member ran mod:spam')
            message.channel.send('spam');
            message.channel.send('spam');
            message.channel.send('spam');
            message.channel.send('spam');
            message.channel.send('spam');
        } else {
            console.log('WARNING: A non-staff member tried to run mod:spam')
            message.channel.send(':no_entry_sign: NO: You are not a member of staff.')
        }
    }
    //mod:reply command
    if(commandIs("reply", message)){
        message.reply('Hello! :stuck_out_tongue:')
    }
    //mod:delete command
    if(commandIs("delete", message)){
        if(hasRole(message.member, "Admin") || hasRole(message.member, "Moderator") || hasRole(message.member, "Staff")){
            if(args.length >= 3){
                message.channel.send(':no_entry_sign: ERROR: Too many arguments. Usage: `mod:delete [amount]`');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
                message.reply(":white_check_mark: OK: Deleted " + msg +" messages. (Including the command you just entered, honeyfry. I'll fix that in the future.)");
            }
    } else {
        console.log('WARNING: A non-staff member tried to run mod:delete')
        message.channel.send(":no_entry_sign: NO: You're not a member of staff.")
    }
}});

client.login('MzAwNTEzNDM2Njc1MDgwMjA1.DA14Iw.h4bT5siarGqGQ0oA1EXwnL7VOYY');