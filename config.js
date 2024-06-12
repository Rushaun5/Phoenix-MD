const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  //For Enabling Commands Like AUTO_STATUS_RED Type true For Disenabling Type false
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  //_________________________________________________________________________________________________________________________________
  LOGS: toBool(process.env.LOGS) || true,
  //_________________________________________________________________________________________________________________________________
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  //_________________________________________________________________________________________________________________________________
  AUTO_REACT: process.env.AUTO_REACT || 'false',
  //_________________________________________________________________________________________________________________________________
  AUDIO_DATA: process.env.AUDIO_DATA || "Phoenix-MD;Abhishek Suresh;https://graph.org/file/8976892f2f615077b48cd.jpg",
  //_________________________________________________________________________________________________________________________________
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || 'false',
  //_________________________________________________________________________________________________________________________________
  SESSION_ID: process.env.SESSION_ID || "", //eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0l3OU5Ja0paWElhQWZzV3JsRWlOVkg3T2UrTEFoS3NYVi9HMXJmMTYwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1RmczFVQ1VWbE90LzFybGcycFFieXZNYTVKTXBmUHhMN0s1VGJXSUFBcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSmxFWmZDeVhhcGFxSmNoUHZaQkY5QnNraU9nVklsTlFrYUxJcVNBdG00PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxQVZSQkQxOUZwMTR4NlJlTnk1dHR0dlR4TEJJeXY2MkxlRmIrYkFpU0NFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNKWUFUMTdaSmkvTm9LY1A4NDdNQ3h6cVZDb1lmdTBiZTQ5eDh1bEVyRUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg0U1ltdDVtNEE0c2lNbHFNSS9CbGdkZGt6cisvVk9nNWRsS0QvR0pTREU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK055ODJDYUxLcS9BRWNaSS8rNEtFVG1ML2sybmd5cWNGVEpRZWx1QVRYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZStCZzhBUXRxSFJlV3JZSTBSMHNJNWJyUEozOWV5dG1VYldBcHdPQmdHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLMXRsUU5yYmJQcVNkOG9qdnNXdjFScG1nem45aDlwUDhGQXFnakI3Wk5pcTl3MEpPd2lxbDFIQklNa0RENnNvLzlJWEhyVHZOeTBKM0RxSno1SENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6ImFYSFdyK2JqbUs3eEltNDlpZWI1UWJVd0ZLRk95dTRwb0xLYUtJMXZpVDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InZxXzVtc3lmUkVHWUgwRFJVUkk1WWciLCJwaG9uZUlkIjoiMmJiOGU0ODgtY2QzOC00NDUzLThkMTYtNTJiNjgwNDI2ZDVjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitqWmVMcEdGTFZLbVdjVUFkVmhidDh2Q3lHQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMUGVqQzVWMXhjcWFHRVN6c0N2eHE3eDdWK2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWU5KVEQxSFoiLCJtZSI6eyJpZCI6IjE4NzY1OTUyOTgwOjExQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNbSs2SU1ERU5LZG83TUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCMHVnU29BZTBxQ0JvUEVrcC9DbUwvMytzV3l2RzR6d3A4Y2NablQzcHdjPSIsImFjY291bnRTaWduYXR1cmUiOiJPOVgyRWdJaXloWGVOVFZUOGxXNnMwZGp4ditMMjl1ejZYbEdqQ1NPcXdpVGttdHBFRUUycVY0dS9ZNjk3WTJHb0hIalVWN2xQazBWRUdReGRPcmJDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZlVSMVZPUEVDckJSZVM4cmdKUFdpelRaU1V2TmJzSkgxRGo2c2lqYkpvT3Vvc1d2ei9IVkNJT3BoM2FmenhENUNkUzFBSlI0MXRLallDU05sczd5Q2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxODc2NTk1Mjk4MDoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRZExvRXFBSHRLZ2dhRHhKS2Z3cGkvOS9yRnNyeHVNOEtmSEhHWjA5NmNIIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4MTQ0NzM0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURBbCJ9Enter Your Session Id Here
  //_________________________________________________________________________________________________________________________________
  SUDO: process.env.SUDO || "18762306464",
  //_________________________________________________________________________________________________________________________________
  SPAM_COUNT: process.env.SPAM_COUNT || "10",
  //_________________________________________________________________________________________________________________________________
  LANG: process.env.LANG || "EN",
  //_________________________________________________________________________________________________________________________________
  HANDLERS: process.env.PREFIX || '-',
  //_________________________________________________________________________________________________________________________________
  RMBG_KEY: process.env.RMBG_KEY || false,
  //_________________________________________________________________________________________________________________________________
  BRANCH: "main",
  //_________________________________________________________________________________________________________________________________
  STICKER_DATA: "🎯𝙿𝚑𝚘𝚎𝚗𝚒𝚡-𝙼𝙳;𝙰𝚋𝚑𝚒𝚜𝚑𝚎𝚔 𝚂𝚞𝚛𝚎𝚜𝚑☘️",
  //_________________________________________________________________________________________________________________________________
  WELCOME_MSG: process.env.WELCOME_MSG || "👋 Hello *@user* Welcome To Our Group *@gname*\n*Total Members:* @count\n*Group Description:*\n@gdesc {pp}",
  //_________________________________________________________________________________________________________________________________
  GOODBYE_MSG: process.env.GOODBYE_MSG || "👋 GoodBye *@user* From *@gname*\n*Total Members:* @count {pp}",
  //_________________________________________________________________________________________________________________________________
  DATABASE_URL: DATABASE_URL,
  //_________________________________________________________________________________________________________________________________
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  //_________________________________________________________________________________________________________________________________
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  //_________________________________________________________________________________________________________________________________
  OWNER_NAME: process.env.OWNER_NAME || "Rushaun",
  //_________________________________________________________________________________________________________________________________
  OWNER_NUMBER: process.env.OWNER_NUMBER || "18762306464",
  //_________________________________________________________________________________________________________________________________
  BOT_NAME: process.env.BOT_NAME || "Patrick bot ",
  //_________________________________________________________________________________________________________________________________
  WORK_TYPE: process.env.MODE || "public",
  //_________________________________________________________________________________________________________________________________
  MENTION_DATA: "01:43 ━━━━●───── 03:50;⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆;919074692450;https://graph.org/file/63942461d4b8d78b360d3.jpg",
  //_________________________________________________________________________________________________________________________________
  MENTION_AUDIO: "https://i.imgur.com/NCifJWe.mp4;https://graph.org/file/ecf0772cb95111796848c.mp4",
  //_________________________________________________________________________________________________________________________________
  MENTION: process.env.MENTION || 'true',
  //_________________________________________________________________________________________________________________________________
  BASE_URL: "https://abhi-api-bvws.onrender.com/",
  //_________________________________________________________________________________________________________________________________
  //Database
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
