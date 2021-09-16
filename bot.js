const Discord = require('discord.js');
// const os = require('os');
const fs = require('fs');
require('date-utils');

const command_prefix = '/';

const client = new Discord.Client();

const token = fs.readFileSync('C:\\Users\\USER\\Desktop\\VSC\\at_bot\\TOKEN.txt', 'utf8');
const anonymityFileLocation = 'C:\\Users\\USER\\Desktop\\VSC\\at_bot\\anonymity.log';
const banListLocation = 'C:\\Users\\USER\\Desktop\\VSC\\at_bot\\banlist.log';

const command_list = [`${command_prefix}discordjs`, `${command_prefix}server`, `${command_prefix}익명`,
`${command_prefix}password`, `${command_prefix}skin`, `${command_prefix}help`]

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
    } else if (msg.content.startsWith(`${command_prefix}password`)) {
        const password = fs.readFileSync('C:\\Users\\USER\\Desktop\\VSC\\at_bot\\password.txt', 'utf8')
        if (msg.content.split(" ").length == 2 && msg.content.split(" ")[1] == password) {
            msg.channel.send(":+1: It's Answer!")
        } else {
            msg.channel.send(":-1: It's not Answer!")
        }
    } else if (msg.content.startsWith(`${command_prefix}skin`)) {
        const embed = new Discord.MessageEmbed();
        const player = msg.content.slice(6, msg.content.length);
        embed.title = `${player}'s Minecraft Skin`;
        embed.setThumbnail(`https://mc-heads.net/head/${player}/left`);
        embed.setImage(`https://mc-heads.net/body/${player}/left`);
        var newDate = new Date();
        var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');;
        embed.setFooter(`${msg.author.username}#${msg.author.discriminator}`
        + ` • ${time}`,
        msg.author.avatarURL());

        msg.channel.send(embed)
    } else if (msg.content == `${command_prefix}help`) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle("**Help**")

        msg.channel.send(embed)
    }
})

client.login(token)
