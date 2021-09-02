const Discord = require('discord.js');
// const os = require('os');
const fs = require('fs');
// const time = require()

const command_prefix = '/';

const client = new Discord.Client();

const token = fs.readFileSync('C:\\Users\\USER\\Desktop\\VSC\\at_bot\\TOKEN.txt', 'utf8');
const anonymityFileLocation = 'C:\\Users\\USER\\Desktop\\VSC\\at_bot\\anonymity.log';
const banListLocation = 'C:\\Users\\USER\\Desktop\\VSC\\at_bot\\banlist.log';

const command_list = [`${command_prefix}discordjs`, `${command_prefix}server`, `${command_prefix}익명`]

function writeAnonymityLog(data) {
    anonymitylog = fs.readFileSync(anonymityFileLocation, 'utf-8');
    fs.writeFileSync(anonymityFileLocation, `${anonymitylog}\n${data}`);
}

function getBanList() {
    return fs.readFileSync(banListLocation, 'utf-8').split();
}

client.on('ready', () => {
    console.log(`Login in as ${client.user.tag}!`);
})

client.on('message', msg => {
    if (command_list.includes(msg.content)) {
        if (getBanList().includes(msg.author.id)) {
            msg.channel.send(`You are banned!`);
            return;
        }
    }

    if (msg.content == `${command_prefix}discordjs`) {
        msg.channel.send('Discord JS. discord.py service ended!');
    } else if (msg.content == `${command_prefix}server`) {
        const embed = new Discord.MessageEmbed();
        embed.title = "**Show Server Of At Bot**";
        // embed.addField("**DISK**", `${os.freemem() / GB} GB / ${os.totalmem() / GB} GB`, true);

        msg.channel.send(embed);
    } else if (msg.content.startsWith(`${command_prefix}익명`)) { // 익명 : anonymity
        msg.delete();

        const embed = new Discord.MessageEmbed();
        embed.title = "**익명의 누군가**"; // 익명의 누군가 : Person who send message.
        embed.addField("**익명**", msg.content.substring(4, msg.content.length), true);
        msg.channel.send(embed);

        writeAnonymityLog(`G [${msg.guild.id}] S [${msg.author.id}] ${msg.content.substring(4, msg.content.length)}`)
    }
})

client.login(token)
