// import projectContent from "./index.js";

class Project {
  constructor(title, description, tools, demo, git) {
    this.title = title;
    this.description = description;
    this.tools = tools;
    this.demo = demo;
    this.git = git;
  }
}

export default function projectContent(data) {
  const projectsObj = data.data.values.map((el) => {
    let api = new Project(el[0], el[1], el[2], el[3], el[4]);
    return api;
  });
  console.log(JSON.stringify(projectsObj));
}
