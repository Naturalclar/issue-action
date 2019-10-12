import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const getIssueContent = async (token: string) => {
  const octokit = new github.GitHub(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.get({
    ...getRepo(),
    issue_number
  });
  const { title, body } = data;
  return { title, body };
};
