const config = require('../config')
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "system",
    react: "🌠",
    alias: ["os","cpu"],
    desc: "Check bot\'s system info",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB'
  let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB'
  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length

  let mes = `
乂 *QUEEN_THARU_V❼ System* 乂

◦ *Total Ram*: ${totalStorage}
◦ *Free Ram*: ${freeStorage}
◦ *CPU Model*: ${cpuModel}
◦ *CPU Speed*: ${cpuSpeed} GHz
◦ *Number of CPU Cores*: ${cpuCount} `

conn.sendMessage(from , { text: mes }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
