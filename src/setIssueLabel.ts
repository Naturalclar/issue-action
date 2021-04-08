import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";
import { Parameter } from './types'

export const setIssueLabel = async (token: string, matchingKeywords: Parameter[]) => {
  const octokit = new github.GitHub(token);

  let issue_number;

  if (getIssueNumber() !== undefined) {
    issue_number = getIssueNumber();
  } else if (getPrNumber() !== undefined) {
    issue_number = getPrNumber();
  } else {
    throw new Error("No Issue Provided");
  }

  let addLabels: string[] = [];
  let removeLabels: string[] = [];

  matchingKeywords.forEach(obj => {
    if (!obj.labels) {
      return;
    }

    if (Array.isArray(obj.labels)) {
      addLabels.push(...obj.labels)
    } else {
      if (obj.labels.addLabels) {
        addLabels.push(...obj.labels.addLabels)
      }

      if (obj.labels.removeLabels) {
        removeLabels.push(...obj.labels.removeLabels)
      }
    }
  })

  await octokit.issues.addLabels({
    ...getRepo(),
    issue_number,
    labels: addLabels
  });

  await Promise.all(removeLabels.map(label => {
    return octokit.issues.removeLabel({
      ...getRepo(),
      issue_number,
      name: label
    }).catch(err => {
      // capture and ignore label not found error
    })
  }));
};
