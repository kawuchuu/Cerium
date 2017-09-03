module.exports.run = async (bot, message, args) => {
    try {
    const config = require("../config.json");
    var msg = message.content.substr(5);
    var shipuser = message.guild.members.random().displayName
    var shipnameauth = message.author.username.substring(0,3) + shipuser.substring(0,3);
    if (!args[0]) {
        message.channel.send(":ship: " + message.author.username + " x " + shipuser + " (" + shipnameauth + ")");
    } else if (msg.includes("@")) {
        var findm = msg.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
        var member = message.guild.members.get(findm);
        var shipnamemem = member.user.username.substring(0,3) + shipuser.substring(0,3);    
        message.channel.send(":ship: " + member.user.username + " x " + shipuser + " (" + shipnamemem + ")");
    } else {
        var shipnamereg = args[0].substring(0,3) + shipuser.substring(0,3);
        message.channel.send(":ship: " + args + " x " + shipuser + " (" + shipnamereg + ")");
    }
} catch(error){
    message.channel.send("**Error:** Failed to ship you.")
    console.error(error)
}

}
module.exports.help = {
    name: "ship",
    desc: "Sends you onto a ship with a random person on this server.",
    parms: "None"
}