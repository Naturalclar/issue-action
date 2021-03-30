import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";

export const getIssueContent = async (token: string) => {
  const octokit = new github.GitHub(token);

  let issue_number;

  if (getIssueNumber() !== undefined) {
    issue_number = getIssueNumber();
  } else if (getPrNumber() !== undefined) {
    issue_number = getPrNumber();
  } else {
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.get({
    ...getRepo(),
    issue_number,
  });

  return `${data.title} ${data.body}`;
};
