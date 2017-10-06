module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    var result = message.content.substr(config.prefix.length + 5);
    if (result.length == 0) {
        message.channel.send(message.author.username + " kissed no one... But I think you would love to kiss " + message.guild.members.random().displayName + "!");
    } else {
        switch(Math.floor(Math.random () * 100) % 6) {
            case 0:
                message.channel.send(message.author.username + " kissed " + result + " on the cheek! Very cute!");
                break;
            case 1:
                message.channel.send(message.author.username + " kissed " + result + " on the lips! Get a room!");
                break;
            case 2:
                message.channel.send(message.author.username + " kissed " + result + " on the lips! How nice!");
                break;
            case 3:
                message.channel.send(message.author.username + " kissed " + result + " on the lips! I'm jealous...");
                break;
            case 4:
                message.channel.send(message.author.username + " kissed " + result + " on the cheek! Awww! Cute! <3");
                break;                         
            case 5:
                message.channel.send(message.author.username + " kissed " + result + " on the cheek! Adorable!");
                break;
        }
    }
}
module.exports.help = {
    name: "kiss",
    parms: "Your true love!",
    desc: "Virtually kiss someone!",
    usage: "[true love]"
}
