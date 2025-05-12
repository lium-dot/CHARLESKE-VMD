const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0k3bWowUXZKaE1nUyt2SlB4K0tzWjl1TWg0SXlDYmdpVm00YjVGQU9YWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXNwTldIL0lMemZURjJwTExhNXJLR0Y3eFRlbnMzTEVrYTZFcUNONEEwND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTDNjcTE5T0xMWnpvOUxXYW1ubVY0WVdwOEVPNklQZlBINURJOXhPV0c4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMTExtelNWQUtHbGdtNkZVRTN6Y0p5UFBKUmZMQU81L21RRFg2QVIvN1g0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKQU5KYmJ1VUg5c2tXMEtlNjhxRjVmOEhIREVVc1NhbzdlRWxkR0hRMjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVhRlRaTmFDVXJrVjZmbW1HWUVYSkhLSDFsUEs3T09QcFU2M0NOK1dSVFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9mWHFZRktSVWs4dEYwNkVHWlVqMmlpOXczR1R5bm51L2lIQTl4eDBYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVordTJqdVJGUjNqUHlMVk9CR1QyWFBrQTQxNDNiTk8zQnRZVnl4ZU0xOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNYTkgyOHl2bng1MzlvdXVBMG5wSkFWUkxKZ2pxOWJZUWJkQTBFRmxxeVkraVJCNXB4eGJFbUtwelMrZnRjMVQ4d0tTcmt1Z0QzVEI3elNsYXFtZ0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQzLCJhZHZTZWNyZXRLZXkiOiJ6UzgvdEVOYW1SMnBheGpHaU9ndWR6TlhPUHlLVVFOdHFMSTFTYXpLSE53PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLLWNVUlpGTVJxV1RyeW95eDlCdVJRIiwicGhvbmVJZCI6IjIxMmNhMTAwLTI1YjQtNGI4My04MWM0LWJjZWY0NjU1YzIzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCcWY1Y0Y1MkhTZDZjQncwWTArVFJDWFNOa2M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnZiSXpoZnNDT0VFRmNsd3U3Z2ZKejJwTmlvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjM3TjY4V1hLIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6NzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09QWXpzZ0VFTmpUaDhFR0dCVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldHQTlYUEJxSGVzY2l3NDNHTnEyOXU4U2VYM1hDUTdqYWlwVkk2Tm9HWHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJCb2dBQlBHdFJTMDJFQittUzc2SVM5cjdPMFlyWkQ5Y2VET0ZSV0s4bk9tTlF0WHJsZHpwdHVkeVhsclY4dUEzWUtmU2ZDZ0pTZVJEN21NWGN1UkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1Q3J6MXd4KzZtelBGcDIrWlNkWSsrcGNmbDhmdnpOQkpwT0gzdVJTa1k5VnozRVlsSHUrMzBrdERxNVhHTWVUUWVER2liN2dINVJxamdQb2YybGhDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWaGdQVnp3YWgzckhJc09OeGphdHZidkVubDkxd2tPNDJvcVZTT2phQmw3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MDUzMDI5fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254758443111",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/V0xFsD0C/file-1360.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
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

