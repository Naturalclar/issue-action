import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";

export const setIssueLabel = async (token: string,  winningArea: string, parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[]) => {
  const octokit = new github.GitHub(token);

  let issue_number;

  if (getIssueNumber() !== undefined) {
    issue_number = getIssueNumber();
  } else if (getPrNumber() !== undefined) {
    issue_number = getPrNumber();
  } else {
    throw new Error("No Issue Provided");
  }

  let labels: string[] = [];

  parameters.forEach(obj => {
    if(winningArea == obj.area){
      obj.labels.forEach(label => {
        labels.push(label);
      })
    }
  })

  await octokit.issues.addLabels({
    ...getRepo(),
    issue_number,
    labels: labels
  });
  
};
