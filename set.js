const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0E3RnJxckpWUjJldXIyZW9OVldPM0dHQkxDM05JZ2hiWDRpemIzWFpXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmJrUmk2UzQ2R2ZweVVkVC9TT2E1KzdwR0prZk9vV2piM0g5NUs2R2ptYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRW1TbTJzSnIwVm9sMEphSkE5VE1kVnFpUUN2M3VNekhYNlIxY0c4VTB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkbStXQ0RmQkJpeUU5WTFLK3ZlaDh5eUQ5VGFRN0VodUkyWTlFSUE2NndBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNIWnh4Qmd5YmVoK0ZnVmtwMkZmNjhUcDJPOElQSWpiNysxWmNIaTBhMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVrdUM2ZUFoclNlb3hrZVMxK3ZJRFB6U0MzUzh1eWNhcFNGR3FCaXZCUzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUIzTE93Zi9BNVZtMHlpRTNOVnd1ekUwS3JobW1YUEt6RmRNS2IyM0ZGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajFPalJYTUVwQTFHQmhuUU1YUUthejRsN25kUW43alZhV2FJcTNGRFVFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlUTTZwL1dqRVZBVHM4TEt3VndDR2xqYWNOQnZjTmZmS0s4ak5VbnBiTldFL0VKYVp4bUdBMXF3a1ptdmNzcXM1dzlVU0pBR0JKYW9malQvanlsMml3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTExLCJhZHZTZWNyZXRLZXkiOiJadnQ1ODVmbVB3clZIWUc2RWtUUFptSDlZVEUzM2JFVkQ4RFFpTkIzLzljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMTc3RTBFMzEwNTA1RUQ5OUE4QjE3MDlENzc0QkE4MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5MzE4NzM0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEMzRUY3RjZCMzBCOUYyNDlCMDFFNjk5MTU3OEJGN0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTMxODczNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTo3MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExNzQ4MDgyNzY1ODI1MDo3MkBsaWQiLCJuYW1lIjoi4pye77iO4piF4Y6v4pi877iO4oSS4pi877iO4oSS4pyp4oSw4pyr4oSV4pmr4pig77iO77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOKzQ3ZE1FRUx2NGtjSUdHQTRnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvMmxXQkN5b0ErVmZpZm9TNlQwbmFGbk4wVnAwL01qTWhVeVJPWUxRUWxNPSIsImFjY291bnRTaWduYXR1cmUiOiJMeGpMV1lhWnBzbnRtK05JcVlWc0dRTzdrTGoxTlpJZHdhbDQxWHJuYVdwaGZPclc2ZjhsSCtPWVhqWnIrTXdaN243bUtpVlltOTJXVUpMeld5U3dCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNXVweE9kY3N0Zzd4MG5LSXlLa1BkUXkxWUpBTkxMdnp6SW5OenUwL1o4RTRmNkhkSjZCUnRGdWpuaUxkNG5OOXpkckw3THVZcGFEUVBleVlDMFBIaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTg0NDMxMTE6NzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjlwVmdRc3FBUGxYNG42RXVrOUoyaFp6ZEZhZFB6SXpJVk1rVG1DMEVKVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5MzE4NzI5LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUE1OSJ9',
    PREFIXE: process.env.PREFIX || "$",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'C༙H༙A༙R༙L༙S༙E༙-X༙M༙D༙',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'no',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'no',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'no',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
