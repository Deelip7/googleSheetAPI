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

class Project {
  constructor(title, description, tools, demo, git) {
    this.title = title;
    this.description = description;
    this.tools = tools;
    this.demo = demo;
    this.git = git;
  }
}

function projectContent(data) {
  let proj1;
  data.data.values.forEach((el) => {
    proj1 = new Project(el[0], el[1], el[2], el[3], el[4]);

    const projectAPI = JSON.stringify(proj1);

    console.log(projectAPI);
  });
}
