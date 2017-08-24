module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");    
    var msg = message.content.substr(config.prefix.length + 3);
    //terrible way of doing it but it works i guess lel
    var msglink = msg.replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+");
    if (msg.length == 0) {
        message.channel.send("**Error:** You haven't told me what to search for!");
    } else {
        message.channel.send("http://www.urbandictionary.com/define.php?term=" + msglink);
    }
}
module.exports.help = {
    name: "ud",
    desc: "Searches for a definition on the Urban Dictionary.",
    parms: "None"
}