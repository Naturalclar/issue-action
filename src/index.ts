import * as core from "@actions/core";
import { getIssueContent } from "./getIssueContent";
import { checkKeyword } from "./checkKeyword";
import { setIssueLabel } from "./setIssueLabel";

async function run() {
  try {
    const keyword = core.getInput("keywords");
    const keywords = keyword.split(" ");
    console.log(`keywords: ${keywords}`);
    const action = core.getInput("action");
    const actionArgs = keyword.split(" ");
    console.log(`action: ${action.split(" ")}`);
    const token = core.getInput("github-token");
    const content = await getIssueContent(token);

    const hasKeyword = checkKeyword(keywords, content);
    if (!hasKeyword) {
      console.log("Keyword not included in this issue");
      return;
    }

    switch (actionArgs[0]) {
      case "label":
        setIssueLabel(token, actionArgs.slice(1));
      case "assign":
        console.log("assign");
      case "close":
        console.log("close");
      case "comment":
        console.log("comment");
      default:
        core.setFailed(`Invalid action: ${actionArgs[0]}`);
        return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
