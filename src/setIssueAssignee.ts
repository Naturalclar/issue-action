import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";

export const setIssueAssignee = async (token: string,  matchingKeywords: { keywords: string[], labels: string[], assignees: string[] }[]) => {
  const octokit = new github.GitHub(token);

  let issue_number;

  if (getIssueNumber() !== undefined) {
    issue_number = getIssueNumber();
  } else if (getPrNumber() !== undefined) {
    issue_number = getPrNumber();
  } else {
    throw new Error("No Issue Provided");
  }

  let assignees: string[] = [];

  matchingKeywords.forEach(obj => {
    obj.assignees.forEach(label => {
      assignees.push(label);
    })
  })
  
  await octokit.issues.addAssignees({
    ...getRepo(),
    issue_number,
    assignees
  });
};
