import projectContent from "./projectObj.js";
import { google } from "googleapis";
import * as dotenv from "dotenv";
dotenv.config({ path: "./credentials/.env" });

const SPREADSHEETID = process.env.SHEETID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const client = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, ["https://www.googleapis.com/auth/spreadsheets.readonly"]);

client.authorize((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected..");
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: "v4", auth: cl });
  const options = {
    spreadsheetId: SPREADSHEETID,
    range: "Sheet1!A2:F8",
    majorDimension: "ROWS",
  };

  let data = await gsapi.spreadsheets.values.get(options);
  projectContent(data);
}
