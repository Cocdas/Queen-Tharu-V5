const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID ||"52cVVZja#hx40e8wMF4UlMQk1BJGV-hbC7vxg2CycQVO9ooOa-xY",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/YhYStZ8/IMG-20240923-WA0006.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "HII. I AM QUEEN_THARU_V➄ WHATSAPP BOT OWNER BY CHAMI",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "ture",
};
