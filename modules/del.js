module.exports.run = async (bot, message, args) => {
    const config = require("../config.json");
    if (message.author.id == message.guild.owner.user.id) {
    var msg = message.content.substr(config.prefix.length + 5);
    var num = parseInt(msg);
    message.delete(1);
    if (!msg) {
        message.channel.send("**Error:** Please enter a number.");
    }
    if (num != msg) {
        message.channel.send("**Error:** Either not a number or too many arguments.");
        return;
    }
    if (msg > 99) {
        message.channel.send("**Error:** Cannot delete more than 99 messages at once.");
        return;
    }
    setTimeout(function () {
        message.channel.bulkDelete(msg);
    }, 5);
    setTimeout(function () {
        if (msg == 1) {
            message.channel.send("Deleted 1 message.");
        } else {
            message.channel.send("Deleted " + msg + " messages.");
        }
    }, 10);
} else {
    message.channel.send("Insufficient permissions.");
}
}
module.exports.help = {
    name: "del",
    desc: "Deletes a series of messages.",
    parms: "Number of messages.",
    usage: "[number]"
}