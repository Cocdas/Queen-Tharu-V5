const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "🎶 Download Songs 🎶",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const search = await yts(q);
        if (!q) return reply("🚫 *Please provide a URL or song name!* 🚫");
        
        const data = search.videos[0];
        const url = data.url;
        
        let desc = `
🎶 *𝗗𝗜𝗭𝗘𝗥 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* 🎶

🎵 *𝗧𝗶𝘁𝗹𝗲:* ${data.title}
📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:* ${data.description}
⏰ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* ${data.timestamp}
📅 *𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:* ${data.ago}
👀 *𝗩𝗶𝗲𝘄𝘀:* ${data.views.toLocaleString()}

🔗 *𝗟𝗶𝗻𝗸:* [Click Here](${url})

*💻 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗗𝗜𝗭𝗘𝗥 💻*
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
        
        // Await user response for choosing audio or document
        reply("🎉 To download, send:\n\n*1* for 🎶 *Audio File*\n*2* for 📄 *Document File*");

        conn.on('chat-update', async chatUpdate => {
            if (!chatUpdate.messages) return;
            const message = chatUpdate.messages.all()[0];
            const messageContent = message.message.conversation || "";

            if (message.key.fromMe) return; // Ignore bot's own messages
            
            if (messageContent === "1" || messageContent === "2") {
                // Download audio
                let down = await fg.yta(url);
                let downloadUrl = down.dl_url;

                if (messageContent === "1") {
                    // Send audio file
                    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                } else if (messageContent === "2") {
                    // Send document file
                    await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "💻 *𝗠𝗔𝗗𝗘 𝗕𝗬 𝗗𝗜𝗭𝗘𝗥* 💻" }, { quoted: mek });
                }
            }
        });
        
    } catch (e) {
        console.log(e);
        reply(`⚠️ *Error:* ${e}`);
    }
});
