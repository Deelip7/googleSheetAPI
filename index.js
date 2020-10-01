require("dotenv").config({ path: "./credentials/.env" });

const SPREADSHEETID = process.env.SHEETID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const { google } = require("googleapis");

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

function projectContent(data) {
  console.clear();

  data.data.values.forEach((el) => {
    console.log(`Title: ${el[0]}`);
    console.log(`Desc: ${el[1]}`);
    console.log(`Tools: ${el[2]}`);
    console.log(`Demo: ${el[3]}`);
    console.log(`Git: ${el[4]}`);
    console.log(`---------------------------------------------------------------`);
  });
}
