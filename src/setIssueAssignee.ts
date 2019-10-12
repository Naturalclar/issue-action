import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const setIssueAssignee = async (token: string, assignees: string[]) => {
  const octokit = new github.GitHub(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  await octokit.issues.addAssignees({
    ...getRepo(),
    issue_number,
    assignees
  });
};
