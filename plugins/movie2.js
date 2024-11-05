const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../lib/functions');
const prabathApi = "6467ad0b29"; // API key
const api = "https://prabath-md-api.up.railway.app/api/"; // Base API link

// Movie Command
cmd({
    pattern: "cmv",
    desc: "movie",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://cine")) {
            return reply("❗️ කරුණාකර චිත්‍රපටයේ සබැඳිය සපයන්න.");
        }

        function input(put, from) {
            let [movie, quality = "480p", jid] = put.split(/\s*\|\s*/);

            if (!movie) {
                return reply("❗️ කරුණාකර චිත්‍රපට නමක් සපයන්න.\n\nඋදා.:\n`cinesub avatar | 480p | 2715171516151658@g.us`");
            }

            const validQualities = ["360p", "480p", "720p", "1080p", "360", "480", "720", "1080"];
            if (!validQualities.includes(quality.toLowerCase())) {
                return reply("⚠️ *වලංගු ප්‍රමාණයක් ඇතුල් කරන්න!*\n\nඋදා.:\n`cinesub avatar | 360p | 2715171516151658@g.us`");
            }

            if (!jid || (!jid.endsWith("@s.whatsapp.net") && !jid.endsWith("@g.us"))) {
                jid = from;
            }

            return { movie, quality, jid };
        }

        let link;
        const info = input(q, from);

        if (info.movie.startsWith("https://cine")) {
            link = info.movie;
        } else {
            let ddd = await fetchJson(`${api}cinesearch?q=${info.movie}&apikey=${prabathApi}`);
            link = ddd.data.data[0].link;
        }

        let desc = await fetchJson(`${api}cinemovie?url=${link}&apikey=${prabathApi}`);

        let movieTitle = desc.data.mainDetails.maintitle;
        let releaseDate = desc.data.mainDetails.dateCreated;
        let directorName = desc.data.moviedata.director;
        let country = desc.data.mainDetails.country;
        let duration = desc.data.mainDetails.runtime;
        let imdbRating = desc.data.moviedata.imdbRating;
        let qualities = desc.data.dllinks.directDownloadLinks.map(link => `> 🖥️ *${link.quality}* - ${link.size}`).join("\n");

        let template = `🎬 *${movieTitle}*\n\n` +
                       `📅 *ප්‍රචාරණ දිනය* : ${releaseDate}\n` +
                       `🎥 *අධ්‍යක්ෂක* : ${directorName}\n` +
                       `🌍 *රට* : ${country}\n` +
                       `⏳ *කාලය* : ${duration}\n` +
                       `⭐ *IMDb අගය* : ${imdbRating}\n\n` +
                       `⚙️ *ලබාගත හැකි ප්‍රමාණයන්*:\n${qualities}\n\n` +
                       `💬 *සුපර්සිංහල HC*` + 
                       `\n\n*CHAMI • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛*`;

        await conn.sendMessage(info.jid, { image: { url: desc.data.mainDetails.imageUrl }, caption: template });
        
        function parseSize(sizeStr) {
            let sizeMatch = sizeStr.match(/^([\d.]+)\s*GB$/);
            return sizeMatch ? parseFloat(sizeMatch[1]) : 0;
        }

        function findLinkByInputQuality(inputQuality) {
            let jsonQuality = info.quality;
            if (!jsonQuality) return reply(`❗️ *මෙම ප්‍රමාණය සඳහා දත්ත නොමැත:* ${inputQuality}`);

            let linkData = desc.data.dllinks.directDownloadLinks.find(link => link.quality.includes(jsonQuality));
            if (linkData) {
                if (parseSize(linkData.size) > 2) {
                    return reply("*❗️ 2GB අධික වීඩියෝ WhatsApp ඔස්සේ ලබා ගත නොහැක 😢*");
                } else {
                    return linkData;
                }
            } else {
                return reply(`*❗️ ${inputQuality} ප්‍රමාණයේ සබැඳියක් නොමැත*`);
            }
        }

        let inputQuality = info.quality;
        let result = findLinkByInputQuality(inputQuality);

        let down = await fetchJson(`${api}cinedownload?url=${result.link}&apikey=${prabathApi}`);

        let senddoc = await conn.sendMessage(info.jid, { document: { url: down.data.direct }, mimetype: down.data.mimeType, fileName: down.data.fileName, caption: "ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛" });
        return await conn.sendMessage(info.jid, { react: { text: '🎬', key: senddoc.key } });

    } catch (e) {
        console.log(e);
        return reply("⚠️ *දත්ත ලබා ගැනීමේ දෝෂයක් ඇතිවිය*");
    }
});
