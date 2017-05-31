# ProJshMod
A Discord moderation bot that's in very early stages.
# Is it useable at the moment?
Not really. It doesn't have many commands. Remember, it's in very early stages. I started the project not too long ago.
# Known Bugs
- If you bulk delete messages with `mod:delete`, the number of messages that it deleted will also add the command you just entered. For example, if you typed in `mod:delete 5`, it will tell you it deleted 6 messages instead of 5. (the command will work though)
# Installation
If you haven't installed git and Node.JS, install them before continuing.
1. Clone this repository with `git clone https://github.com/projsh/ProJshMod.git`
2. Install discord.js with `npm install discord.js`
3. Make sure the node_modules folder is in the same folder as projshmod.js
4. Add your bot's token in `config.json`
5. Run the bot with `node projshmod.js`*
*If you're using nodemon, use `nodemon projshmod.js` instead.
