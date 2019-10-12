import * as core from "@actions/core";
import { getIssueContent } from "./getIssueContent";
import { checkKeyword } from "./checkKeyword";

async function run() {
  try {
    const keyword = core.getInput("keyword");
    const keywords = keyword.split(" ");
    console.log(`keyword: ${keywords}`);
    const action = core.getInput("action");
    const actions = keyword.split(" ");
    console.log(`action: ${action.split(" ")}`);
    const token = core.getInput("github-token");
    const content = await getIssueContent(token);

    const hasKeyword = checkKeyword(keywords, content);
    if (!hasKeyword) {
      console.log("Keyword not included in this issue");
      return;
    }

    switch (actions[0]) {
      case "label":
        console.log("label");
      case "assign":
        console.log("assign");
      case "close":
        console.log("close");
      case "comment":
        console.log("comment");
      default:
        core.setFailed(`Invalid action: ${actions[0]}`);
        return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
