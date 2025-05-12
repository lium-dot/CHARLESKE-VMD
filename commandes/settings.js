Skip to content
Navigation Menu

Code
Pull requests
Actions
Projects
NEXUS-AI/pkdriller
/settings.js
Pkdriller
Pkdriller
17 hours ago
546 lines (428 loc) · 19.5 KB

Code

Blame
  operate: async ({ reply, args, prefix, command, db, isCreator }) => {
const fs = require('fs');
const fsp = fs.promises;

module.exports = [
 {
  command: ['addbadword'],
  operate: async ({ Cypher, m, isCreator, mess, prefix, args, q, bad, reply }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Use ${prefix}addbadword [harsh word].`);

    if (bad.includes(q)) {
      return reply('This word is already in the list!');
    }
    
    bad.push(q);

    try {
      await fsp.writeFile('./src/badwords.json', JSON.stringify(bad, null, 2));
      reply('Successfully added bad word!');
    } catch (error) {
      console.error('Error writing to badwords.json:', error);
      reply('An error occurred while adding the bad word.');
    }
  }
},
{
  command: ['addignorelist', 'ban', 'banchat'],
  operate: async ({ m, args, isCreator, loadBlacklist, mess, reply }) => {
    if (!isCreator) return reply(mess.owner);

    let mentionedUser = m.mentionedJid && m.mentionedJid[0];
    let quotedUser = m.quoted && m.quoted.sender;
    let userToAdd = mentionedUser || quotedUser || m.chat;

    if (!userToAdd) return reply('Mention a user, reply to their message, or provide a phone number to ignore.');

    let blacklist = loadBlacklist();
    if (!blacklist.blacklisted_numbers.includes(userToAdd)) {
        blacklist.blacklisted_numbers.push(userToAdd);

    if (global.dbToken) {
        await global.writeDB();
    }
await reply(`+${userToAdd.split('@')[0]} added to the ignore list.`);
        } else {
await reply(`+${userToAdd.split('@')[0]} is already ignored.`);
        }
  }
},
{
  command: ['addsudo', 'addowner'],
  operate: async ({ m, args, isCreator, reply }) => {
if (!isCreator) return reply(mess.owner);

if (m.chat.endsWith('@g.us') && !(m.mentionedJid && m.mentionedJid[0]) && !(m.quoted && m.quoted.sender)) {
  return reply('Reply to or tag a person!');
}

    const userToAdd = m.mentionedJid && m.mentionedJid[0] || m.quoted && m.quoted.sender || m.chat;

    if (!userToAdd) return reply('Mention a user or reply to their message to add them to the sudo list.');

    const sudoList = global.db.data.sudo;

    if (!sudoList.includes(userToAdd)) {
      sudoList.push(userToAdd);
      if (global.dbToken) await global.writeDB();
await reply(`+${userToAdd.split('@')[0]} added to the sudo list and are be able to use any function of the bot even in private mode.`);
    } else {
await reply(`+${userToAdd.split('@')[0]} is already a sudo user.`);
    }
  }
},
  {
  command: ['alwaysonline'],
    db.data.settings.mode = option;

    if (global.dbToken) {
        await global.writeDB();
    }

    reply(`Bot mode set to: *${option}*`);
  }
},
{
  command: ['setmenu', 'menustyle'],
  operate: async ({ reply, args, prefix, command, db, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Example: ${prefix + command} 2\n\nOptions:\n1 = Document menu (Android only)\n2 = Text only menu (Android & iOS)\n3 = Image menu with context (Android & iOS)\n4 = Image menu (Android & iOS)\n5 = Footer/faded menu\n6 = Payment menu`);

    const validOptions = ["1", "2", "3", "4", "5", "6"];
    const option = args[0];

    if (!validOptions.includes(option)) return reply("⚠️ Invalid menu style. Use a number between *1-6*.");

    db.data.settings.menustyle = option;
    reply(`✅ Menu style changed to *${option}* successfully.`);

    if (global.dbToken) await global.writeDB();
  }
},
{
  command: ['setprefix'],
  operate: async ({ reply, args, prefix, command, db, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Example: ${prefix + command} !\n\n- This will change the bot prefix to *!*`);

    let newPrefix = args[0];
    if (newPrefix.toLowerCase() === "none" || newPrefix.toLowerCase() === "noprefix") {
      newPrefix = "";
    } else if (newPrefix.length > 3) {
      return reply("⚠️ Prefix should be 1-3 characters long.");
    }

    db.data.settings.prefix = newPrefix;
    reply(`✅ Prefix changed to *${newPrefix || "No Prefix"}* successfully.`);

    if (global.dbToken) await global.writeDB();
  }
},
{
  command: ['setstatusemoji', 'statusemoji'],
  operate: async ({ reply, args, prefix, command, db, isCreator, mess }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Example: ${prefix + command} 🧡\n\n- This will change the bot's status reaction emoji to *🧡*`);

    const newEmoji = args[0];

    if (!/^\p{Emoji}$/u.test(newEmoji)) return reply("⚠️ Please provide a single valid emoji.");

    db.data.settings.statusemoji = newEmoji;
    reply(`✅ Status reaction emoji changed to *${newEmoji}* successfully.`);

    if (global.dbToken) await global.writeDB();
  }
},
  {
  command: ['welcome'],
  operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber }) => {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

    const validOptions = ["on", "off"];
    const option = args[0].toLowerCase();

    if (!validOptions.includes(option)) return reply("Invalid option");

    db.data.settings.welcome = option === "on";

    if (global.dbToken) {
        await global.writeDB();
    }

    reply(`Group welcome/left messages ${option === "on" ? "enabled" : "disabled"} successfully`);
  }
},
{
  command: ['getsettings'],
  operate: async ({ reply, db }) => {
    const settings = db.data.settings;
    
    let message = "⚙️ *Current Bot Settings:*\n\n";
    for (const [key, value] of Object.entries(settings)) {
        message += `🔸 *${key}*: ${typeof value === "boolean" ? (value ? "ON" : "OFF") : value}\n`;
    }

    reply(message);
  }
},
{
  command: ['resetsetting'],
  operate: async ({ reply, args, prefix, command, db, isCreator }) => {
    if (!isCreator) return reply("Only the owner can reset settings.");
    if (args.length < 1) return reply(`Example: ${prefix + command} <setting/all>\n\n- Use *all* to reset all settings.\n- Use a specific setting name to reset only that.`);

    const settingToReset = args[0].toLowerCase();
    const defaultSettings = {
        prefix: ".",
        mode: "public",
        autobio: false,
        anticall: false,
        chatbot: false,
        autotype: false,
        autoread: false,
        welcome: false,
        antiedit: "private",
        menustyle: "2",
        autoreact: true,
        statusemoji: "🧡",
        autorecord: false,
        antidelete: "private",
        alwaysonline: true,
        autoviewstatus: true,
        autoreactstatus: false,
        autorecordtype: false
    };

    if (settingToReset === "all") {
        db.data.settings = { ...defaultSettings };
        reply("✅ All settings have been reset to default.");
    } else if (settingToReset in defaultSettings) {
        db.data.settings[settingToReset] = defaultSettings[settingToReset];
        reply(`✅ *${settingToReset}* has been reset to *${defaultSettings[settingToReset]}*.`);
    } else {
        reply(`⚠️ Invalid setting name. Use *${prefix + command} all* to reset everything or provide a valid setting name.`);
    }

    if (global.dbToken) await global.writeDB();
  }
}
];
CHARLESKE/Charleskenya1/settings.js at main · Charleskenya1/CHARLESKE 
