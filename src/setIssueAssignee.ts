import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";

export const setIssueAssignee = async (token: string,  winningArea: string, parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[]) => {
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

  parameters.forEach(obj => {
    if(winningArea == obj.area) {
      obj.assignees.forEach(assignee => {
        assignees.push(assignee);
      })
    }
  })
  
  await octokit.issues.addAssignees({
    ...getRepo(),
    issue_number,
    assignees
  });
};
