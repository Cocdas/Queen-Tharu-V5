const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
let ayo = `QUEEN_THARU_V❼ v${require("../package.json").version} (Test)\nCHAMINDU`

cmd({
    pattern: "spotify",
    alias: ["spot"],
    use: '.spotify <query>',
    react: "🍟",
    desc: "Search and DOWNLOAD VIDEOS from xvideos.",
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
//if (!isMe) return await reply('🚩 You are not a premium user\nbuy via message to owner!!')
if (!q) return reply('🚩 *Please give me words to search*')
let res = await fetchJson('https://manaxu-seven.vercel.app/api/internet/spotify?query='+q)
let wm = `QUEEN_THARU_V❼ v${require("../package.json").version} (Test)\nCHAMINDU`
const msg = `乂 S P O T I F Y - D L 

*Entered Name:* ${q}`
const data = res.result
if (data.length < 1) return await conn.sendMessage(from, { text: "🚩 *I couldn't find anything :(*" }, { quoted: mek } )
var sections = []
        res.result.map((v) => {
          sections.push({
            rows: [{
              title: `${v.name}`,
              description: `Artist : ${v.artists} Mileseconds : ${v.duration_ms}`,
              id: `.spotifydl ${v.link}`
            }]
          })
        })
        const buttons = [{
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Tap Here!',
            sections
          })
        }]
        let message = {
            imge: `https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png`,
            header: '',
            footer: wm,
            body: msg
        }
return conn.sendButtonMessage(from, buttons, m, message) 
} catch (e) {
    console.log(e)
  await conn.sendMessage(from, { text: '🚩 *Error !!*' }, { quoted: mek } )
}
})

//------------------------dl---------------
cmd({
  pattern: "spotifydl",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me spotify url !!*')
let res = await fetchJson('https://manaxu-seven.vercel.app/api/downloader/spotify?url='+q)
let x = res.result
let wm = `QUEEN_THARU_V❼ v${require("../package.json").version} (Test)\nCHAMINDU`
let dat = `乂 S P O T I F Y - D L 

*Title:* ${x.title}
*Type:* ${x.type}
*Artist* ${x.artist}

  *SELECT SONG TYPE*`
	
            let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "DOCUMENT SONG",
                    id: `.spodoc ${x.download}`
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "AUDIO SONG",
                    id: `.spoaud ${x.download}`
                }),
            }
            ]
            let message = {
                image: x.image,
                header: '',
                footer: wm,
                body: dat

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
} catch (e) {
reply(N_FOUND)
console.log(e)
}
})





cmd({
    pattern: "spodoc",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
conn.sendMessage(from, { document: await getBuffer(q), mimetype: 'audio/mpeg', fileName: q + '.mp3', caption: ayo}, { quoted: mek })
} catch (e) {
    reply('*ERROR !!*')
  console.log(e)
}
})

cmd({
  pattern: "spoaud",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
await conn.sendMessage(from, { react: { text: '📥', key: mek.key }})
if(!q) return await conn.sendMessage(from , { text: '*Need link...*' }, { quoted: mek } ) 
conn.sendMessage(from, { audio: await getBuffer(q), mimetype: 'audio/mpeg' }, { quoted: mek })
} catch (e) {
  reply('*ERROR !!*')
console.log(e)
}
})