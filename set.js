const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0lKR09kZXZlbGU3L01QcHNVT1AxamhtRG5CQlZ1T2ZiV2QwcEVTTEozOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmg0NXR1M3BDK3FreHFLYWZ5NEVaT3loK3Z5a2dpb2NsWCt5dXkvYkZ6UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRTJYN040dXRrZ3htdm9SODBDS2FMQmgzUFpOMWxQVG5MbS9BL0VFdTNnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvQlMrcGluQThZeW1TbHJIa2lySFRIaGI5K2FwcFptNXVSVmJVaGxjK3k0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVJckE3eC9xNU5naDN2VWVYS21UQXoyTWlXUXNLelNsWW1oa0hsTVMvVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVOZjl6cW5zamhLbnpySENwbVQ5WU9LWGpjVzRMYUczUno1L3pYR1V1UnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01jaFNZNGFteGRIaFhSREtzS2VNN0FpMlhrTysxUWJrNjRFU1JqS2tVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWCt2TTlqK2NjOEI5aDJlU1hRaHlrbzhtOEgvUHd3YmNLcjdWNDJ1eHgxaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQ3OHZiVDNYLzdEcS9YeHFLZnoyWkJGajRYTGpYTDR1WW1JMTRwTTN0eHZGekMyYUw1RWxrOFRBVEttWjN5VDlVMjAzQ3JyWC9EeXpvazh4NmdhK0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6Iks3QTErV1cxdzVSNS80L1hnVVFKT1hvVWZBZlViNnpSUktLS1pNMjNwWHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzU4NDQzMTExQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFERjRCMEQzODcyNzE1NUYxOEJBNTY2MDhEQ0ZBMDgxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDY2MDU0OTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyREEwNEQ2MDIwNzkyMENENkY1Qjk1NTZCOTBFQUQ3MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2NjA1NDkzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJU3FTMFZ6TVNMaWU4ZFJBUVNKaUlBIiwicGhvbmVJZCI6IjNjYmM2NTQxLTVjMDItNGVmZC1hN2FmLTk2MGRkNWVmMzc4ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiSUhEdWkvS25WcG5RV1pTUG5NcUJZZDBqcXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczZEa1dnVU1pME9BZk1MMmdBMy9PTHhFbkk4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkQyNDJWRlcxIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLimIXhjq/imLzvuI7ihJLimLzvuI7ihJLinKnihLDinKvihJXimasifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0llbW9NOENFS09yN01BR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikd5RVlodVpNYUhtbnJPUVJEL1NIOEwwWVFmM2RoVzRJNFNya3AyTlRQa009IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJUSW9jcVVqMDV0dmU5NjRiTVhwcFBVNjJkNS9iQ3pobWQvOXpmbVFLWG9VZlkvY0JuRWZJVERmbjFCL05LUU4zMDhCaXlndVhZZHdyN3g2NG5NN0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkVU16NVdTU1VvNitZKzBhOUxER0J4Y0NqV1lhd1BWR215bDJMamxBNDRDYU9TQjFobWJhUTZ0aFFOWkIzMHJYalhaOEpEY1JvZHcwYnFqZ3BRdlZEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJzaEdJYm1UR2g1cDZ6a0VRLzBoL0M5R0VIOTNZVnVDT0VxNUtkalV6NUQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY2MDU0ODgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS2MxIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254758443111",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/h0Sw13b/file-1285.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
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

