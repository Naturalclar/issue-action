import * as core from "@actions/core";
import { getIssueContent } from "./getIssueContent";
import { checkKeyword } from "./checkKeyword";
import { setIssueLabel } from "./setIssueLabel";
import { setIssueAssignee } from "./setIssueAssignee";

async function run() {
  try {
    core.setOutput("labeled", false.toString());
    core.setOutput("assigned", false.toString());
    const titleOrBody: string = core.getInput("title-or-body");
    const keywords: string[] = JSON.parse(
      core.getInput("keywords", { required: true })
    );

    console.log(`keywords: ${keywords}`);

    const token = core.getInput("github-token");
    const content = await getIssueContent(token, titleOrBody);

    const hasKeyword = checkKeyword(keywords, content);
    if (!hasKeyword) {
      console.log("Keyword not included in this issue");
      return;
    }

    const labelsInput: string = core.getInput("labels");
    const assigneesInput: string = core.getInput("assignees");
    if (!labelsInput && !assigneesInput) {
      core.setFailed(
        "labels or assignees input not found. Make sure your `.yml` file contains `labels` or `assignees`"
      );
    }

    if (labelsInput) {
      const labels: string[] = JSON.parse(labelsInput);
      console.log(labels);
      setIssueLabel(token, labels);
      core.setOutput("labeled", true.toString())
    }

    if (assigneesInput) {
      const assignees: string[] = JSON.parse(assigneesInput);
      console.log(assignees);
      setIssueAssignee(token, assignees);
      core.setOutput("assigned", true.toString())
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
