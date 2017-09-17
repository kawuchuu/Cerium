module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    var result = message.content.substr(config.prefix.length + 5);
    //wink wink
    if (message.author.id == 250726367849611285 && result.length == 0) {
        message.channel.send("projsh_ kissed jassiexkanz666 on the cheek! I can tell Josh loves Jassie! Those two are very cute!");
    } else if (message.author.id == 223987673365217281 && result.length == 0) { 
        message.channel.send("jassiexkanz666 kissed projsh_ on the cheek! I can tell Jassie loves Josh! Those two are very cute!");
    } else if (result.length == 0) {
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
