import * as core from "@actions/core";
import { getComment } from "./getComment";

async function run() {
  try {
    const keyword = core.getInput("keyword");
    console.log(`keyword: ${keyword}`);
    const action = core.getInput("action");
    console.log(`action: ${action}`);
    const token = core.getInput("github-token");
    const comment = await getComment(token);
    if (comment) {
      core.setOutput("title", comment.title);
      core.setOutput("body", comment.body);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
