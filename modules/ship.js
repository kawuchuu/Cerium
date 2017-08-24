module.exports.run = async (bot, message, args) => {
    var shipuser = message.guild.members.random().displayName
    var shipname = message.author.username.substring(0,3) + shipuser.substr(3);
    message.channel.send(":ship: " + message.author.username + " x " + shipuser + " (Ship name: " + shipname + ")");
}
module.exports.help = {
    name: "ship",
    desc: "Sends you onto a ship with a random person on this server.",
    parms: "None"
}